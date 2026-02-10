import prisma from '../prismaClient.js';

export async function listBookingsByCalendarId(calendarId) {
  return prisma.booking.findMany({
    where: { calendarId },
    orderBy: { startTime: 'asc' },
    include: { service: true },
  });
}

export async function hasOverlappingBooking({ calendarId, startTime, endTime }) {
  const overlapping = await prisma.booking.findFirst({
    where: {
      calendarId,
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    },
  });

  return Boolean(overlapping);
}

export async function createBooking({
  calendarId,
  serviceId,
  customerName,
  customerEmail,
  startTime,
  endTime,
}) {
  return prisma.booking.create({
    data: {
      calendarId,
      serviceId,
      customerName,
      customerEmail,
      startTime,
      endTime,
    },
  });
}
