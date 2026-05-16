import type { Prisma } from "@prisma/client";

/**
 * Vendor + denormalized relations, suitable for vendor cards and detail pages.
 * Use this type when passing data from RSC pages into Client components.
 */
export type VendorWithRelations = Prisma.VendorGetPayload<{
  include: {
    vendorVerticals: { include: { vertical: true } };
    vendorFeatures: { include: { feature: true } };
  };
}>;

export const vendorWithRelationsArgs = {
  include: {
    vendorVerticals: { include: { vertical: true } },
    vendorFeatures: { include: { feature: true } },
  },
} as const satisfies Prisma.VendorDefaultArgs;
