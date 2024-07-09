const OrderService = require('./order-services');

describe('OrderService', () => {
  let orderService;
  let mockOrderRepository;
  let mockPaymentService;

  beforeEach(() => {
    mockOrderRepository = {
      save: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(null)),
      findAll: jest.fn().mockReturnValue([]),
      delete: jest.fn(),
    };
    mockPaymentService = {
      processPayment: jest.fn().mockResolvedValue(true),
    };

    orderService = new OrderService(mockOrderRepository, mockPaymentService);
  });

  describe('placeOrder', () => {
    it('should place an order successfully', async () => {
      const order = { id: 1, amount: 100 };
      const result = await orderService.placeOrder(order);
      expect(result).toBe(true);
      expect(mockPaymentService.processPayment).toHaveBeenCalledWith(order.amount);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(order);
    });

    it('should not save the order if payment fails', async () => {
      const order = { id: 1, amount: 100 };
      mockPaymentService.processPayment.mockResolvedValue(false);

      const result = await orderService.placeOrder(order);
      expect(result).toBe(false); // Verifica que el resultado es false
      expect(mockPaymentService.processPayment).toHaveBeenCalledWith(order.amount);
      // Confirma que save no se llamó porque el pago falló
      expect(mockOrderRepository.save).not.toHaveBeenCalled();
    });
  });


  describe('getOrderById', () => {
    it('should return the order by ID', async () => {
      const orderId = 1;
      const order = { id: orderId, amount: 100 };
      mockOrderRepository.findById.mockReturnValue(Promise.resolve(order));

      const result = await orderService.getOrderById(orderId);
      expect(result).toEqual(order);
      expect(mockOrderRepository.findById).toHaveBeenCalledWith(orderId);
    });

    it('should return null if the order does not exist', async () => {
      const orderId = 999;
      mockOrderRepository.findById.mockReturnValue(Promise.resolve(null));

      const result = await orderService.getOrderById(orderId);
      expect(result).toBeNull();
      expect(mockOrderRepository.findById).toHaveBeenCalledWith(orderId);
    });
  });


  describe('cancelOrder', () => {
    it('should throw an error if the order does not exist', async () => {
      const orderId = 999;
      const order = { id: orderId, amount: 100 };
      expect.assertions(2);

      try {
        await orderService.cancelOrder(orderId);
      } catch (error) {
        expect(error.message).toContain('Order not found'); // Ajusta esto según el mensaje de error que tu implementación real arroje
      }

      expect(mockOrderRepository.findById).toHaveBeenCalledWith(orderId);
    });

    it('should cancel an existing order', async () => {
      const orderId = 1;
      const order = { id: orderId, amount: 100 };
      mockOrderRepository.findById.mockReturnValue(Promise.resolve(order));

      await orderService.cancelOrder(orderId);
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(order);
    });
  });


  describe('listAllOrders', () => {
    it('should list all orders', async () => {
      const orders = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
      mockOrderRepository.findAll.mockResolvedValue(orders);

      const result = await orderService.listAllOrders();
      expect(result).toEqual(orders);
      expect(mockOrderRepository.findAll).toHaveBeenCalled();
    });
  });
});
