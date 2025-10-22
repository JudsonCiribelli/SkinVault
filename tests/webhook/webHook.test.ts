import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import prismaClient from "../../src/lib/client.ts";
import { WebHookService } from "../../src/services/webhook/webHookService.ts";
import { makeOrder } from "../factories/makeOrder.ts";
import { Payment } from "mercadopago";
import supertest from "supertest";
import { startServer } from "../../src/server.ts";
import type { Express } from "express";

vi.mock("mercadopago", async (importOriginal) => {
  const actual = await importOriginal<typeof import("mercadopago")>();
  const mockPayment = vi.fn().mockImplementation(() => ({
    get: vi.fn(),
  }));
  return {
    ...actual,
    Payment: mockPayment,
  };
});

describe("WebHookService", () => {
  let webHookService: WebHookService;

  beforeAll(() => {
    webHookService = new WebHookService();
  });

  beforeEach(async () => {
    vi.clearAllMocks();

    await prismaClient.transaction.deleteMany();
    await prismaClient.review.deleteMany();
    await prismaClient.order.deleteMany();
    await prismaClient.sellingItem.deleteMany();
    await prismaClient.purchasedItem.deleteMany();
    await prismaClient.categoryNameSkin.deleteMany();
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  test("quando o pagamento é aprovado, deve finalizar a ordem e creditar o vendedor", async () => {
    const { order, seller, buyer, sellingItem, skin } = await makeOrder();
    const initialSellerBalance = seller.balance;

    const mockApprovedResponse = {
      id: 123456789,
      external_reference: order.id,
      status: "approved",
      api_response: {
        status: 200,
        headers: ["Content-Type", ["application/json"]] as [string, string[]],
        data: {},
      },
    };

    vi.mocked(Payment).mockImplementation(() => {
      return {
        get: vi.fn().mockResolvedValueOnce(mockApprovedResponse),
        search: vi.fn(),
        cancel: vi.fn(),
        capture: vi.fn(),
        create: vi.fn(),
        config: {} as any,
      } as any;
    });

    await webHookService.execute({ paymentId: "mock-payment-id" });

    const updatedOrder = await prismaClient.order.findUnique({
      where: { id: order.id },
    });

    const updatedSkin = await prismaClient.categoryNameSkin.findUnique({
      where: { id: skin.id },
    });

    const updatedSeller = await prismaClient.user.findUnique({
      where: { id: seller.id },
    });

    expect(updatedOrder?.status).toBe("FINISHED");
    expect(updatedSkin?.ownerId).toBe(buyer.id);
    expect(updatedSeller?.balance.toNumber()).toBeGreaterThan(
      Number(initialSellerBalance)
    );
  });

  test("quando o pagamento é rejeitado, deve atualizar o status da ordem para PAYMENT_FAILED", async () => {
    const { order } = await makeOrder();

    const mockRejectedResponse = {
      id: 987654321,
      external_reference: order.id,
      status: "rejected",
      api_response: {
        status: 200,
        headers: ["Content-Type", ["application/json"]] as [string, string[]],
        data: {},
      },
    };

    vi.mocked(Payment).mockImplementation(() => {
      return {
        get: vi.fn().mockResolvedValueOnce(mockRejectedResponse),
        search: vi.fn(),
        cancel: vi.fn(),
        capture: vi.fn(),
        create: vi.fn(),
        config: {} as any,
      } as any;
    });

    await webHookService.execute({ paymentId: "mock-payment-id" });

    const updatedOrder = await prismaClient.order.findUnique({
      where: { id: order.id },
    });

    expect(updatedOrder?.status).toBe("PAYMENT_FAILED");
  });
});
