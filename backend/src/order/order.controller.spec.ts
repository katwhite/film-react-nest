import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { randomUUID as uuid } from 'crypto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn((dto: CreateOrderDto) =>
          Promise.resolve([
            {
              total: dto.tickets.length,
              items: dto.tickets.map((i) => ({ id: uuid(), ...i })),
            },
          ]),
        ),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should call createOrder with correct DTO', async () => {
    const dto: CreateOrderDto = {
      email: 'email@mail.com',
      phone: '+79999999999',
      tickets: [
        {
          film: uuid(),
          session: uuid(),
          daytime: new Date().toISOString(),
          row: 5,
          seat: 10,
          price: 350,
        },
      ],
    };
    await controller.createOrder(dto);
    expect(orderService.createOrder).toHaveBeenCalledWith(dto);
  });
});
