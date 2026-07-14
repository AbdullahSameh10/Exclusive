import { Skeleton, Stack } from "@mui/material";

const CARD_WIDTH = 270;
const IMAGE_HEIGHT = 250;
const ACTION_BTN_HEIGHT = 40;

export default function ProductCardSkeleton() {
  return (
    <div className="group/card flex w-fit cursor-pointer flex-col gap-4 rounded-[4px] font-poppins">
      {/* IMAGE WRAPPER (exact match) */}
      <div className="relative overflow-hidden">
        {/* Image */}
        <div className="flex h-[250px] w-[270px] items-center justify-center overflow-hidden rounded-lg bg-[#F5F5F5]">
          <Skeleton
            variant="rectangular"
            width={CARD_WIDTH}
            height={IMAGE_HEIGHT}
          />
        </div>

        {/* Float Badge */}
        <div className="absolute left-3 top-3">
          <Skeleton variant="rounded" width={55} height={26} />
        </div>

        {/* Action Icons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Skeleton variant="circular" width={34} height={34} />
          <Skeleton variant="circular" width={34} height={34} />
        </div>

        {/* Add To Cart — SPACE RESERVED */}
        <div className="absolute bottom-0 h-10 w-[270px]">
          <Skeleton
            variant="rectangular"
            width={CARD_WIDTH}
            height={ACTION_BTN_HEIGHT}
            className="rounded-bl rounded-br"
          />
        </div>
      </div>

      {/* TEXT CONTENT */}
      <Stack spacing={1}>
        {/* Title */}
        <Skeleton variant="text" width={230} height={22} />

        {/* Prices */}
        <div className="flex gap-3">
          <Skeleton variant="text" width={75} height={20} />
          <Skeleton variant="text" width={60} height={20} />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton variant="rectangular" width={90} height={16} />
          <Skeleton variant="text" width={40} height={16} />
        </div>
      </Stack>
    </div>
  );
}