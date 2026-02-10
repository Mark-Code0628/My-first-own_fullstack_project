import prisma from '../prismaClient.js';

export async function listServicesByCalendarId(calendarId) {
  return prisma.service.findMany({
    where: { calendarId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createServiceForCalendar({ calendarId, name, durationMin, price }) {
  return prisma.service.create({
    data: {
      calendarId,
      name,
      durationMin,
      price,
    },
  });
}

export async function findServiceById(serviceId) {
  return prisma.service.findUnique({
    where: { id: serviceId },
  });
}
