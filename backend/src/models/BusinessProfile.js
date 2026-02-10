import prisma from '../prismaClient.js';

export async function findCalendarBySlug(slug) {
  return prisma.calendar.findUnique({
    where: { slug },
  });
}

export async function findCalendarByVendorId(vendorId) {
  return prisma.calendar.findUnique({
    where: { vendorId },
  });
}

export async function createCalendarForVendor({ vendorId, slug }) {
  return prisma.calendar.create({
    data: { vendorId, slug },
  });
}
