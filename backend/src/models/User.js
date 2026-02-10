import prisma from '../prismaClient.js';

export async function findVendorByEmail(email) {
  return prisma.vendor.findUnique({
    where: { email },
    include: { calendar: true },
  });
}

export async function findVendorById(id) {
  return prisma.vendor.findUnique({
    where: { id },
    include: { calendar: true },
  });
}

export async function createVendorWithCalendar({ email, passwordHash, name, slug }) {
  return prisma.$transaction(async (tx) => {
    const vendor = await tx.vendor.create({
      data: { email, passwordHash, name },
    });

    const calendar = await tx.calendar.create({
      data: {
        slug,
        vendorId: vendor.id,
      },
    });

    return { vendor, calendar };
  });
}
