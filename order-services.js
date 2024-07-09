class OrderService {
  constructor(orderRepository, paymentService) {
    this.orderRepository = orderRepository;
    this.paymentService = paymentService;
  }

  async placeOrder(order) {
    const paymentProcessed = await this.paymentService.processPayment(order.amount);
    if (paymentProcessed) {
      await this.orderRepository.save(order);
      return true;
    }
    return false;
  }

  async getOrderById(id) {
    return this.orderRepository.findById(id).then(order => order || null);
  }

  async cancelOrder(id) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new Error('Order not found');
    await this.orderRepository.delete(order);
  }

  async listAllOrders() {
    return this.orderRepository.findAll();
  }
}
module.exports = OrderService;
