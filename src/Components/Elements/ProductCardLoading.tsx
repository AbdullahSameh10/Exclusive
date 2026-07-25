import { Skeleton, Stack } from "@mui/material";
import { useMemo } from "react";

export default function ProductCardLoading() {
  const skeletonStyles = useMemo(
    () => ({
      bgcolor: "rgba(0,0,0,0.08)",
      ".dark &": {
        bgcolor: "rgba(255,255,255,0.12)",
      },
    }),
    [],
  );

  return (
    <div className="group/card flex w-full max-w-[270px] flex-shrink-0 flex-col gap-4 rounded-md font-poppins">
      {/* ================= IMAGE ================= */}

      <div className="relative overflow-hidden rounded-lg">
        <div className="flex aspect-[270/250] w-full items-center justify-center overflow-hidden rounded-lg bg-[#F5F5F5] dark:bg-neutral-800">
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={skeletonStyles}
            className="!h-full !w-full"
          />
        </div>

        {/* Sale Badge */}

        <div className="absolute left-3 top-3">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={55}
            height={26}
            sx={skeletonStyles}
          />
        </div>

        {/* Icons */}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Skeleton
            variant="circular"
            animation="wave"
            width={34}
            height={34}
            sx={skeletonStyles}
          />

          <Skeleton
            variant="circular"
            animation="wave"
            width={34}
            height={34}
            sx={skeletonStyles}
          />
        </div>

        {/* Add To Cart */}

        <div className="absolute bottom-0 left-0 w-full">
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={skeletonStyles}
            className="!h-10 !w-full rounded-b-md"
          />
        </div>
      </div>

      {/* ================= TEXT ================= */}

      <Stack spacing={1}>
        {/* Title */}

        <Skeleton
          variant="text"
          animation="wave"
          height={28}
          width="85%"
          sx={skeletonStyles}
        />

        {/* Price */}

        <div className="flex gap-3">
          <Skeleton
            variant="text"
            animation="wave"
            width={70}
            height={22}
            sx={skeletonStyles}
          />

          <Skeleton
            variant="text"
            animation="wave"
            width={55}
            height={22}
            sx={skeletonStyles}
          />
        </div>

        {/* Rating */}

        <div className="flex items-center gap-2">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={90}
            height={16}
            sx={skeletonStyles}
          />

          <Skeleton
            variant="text"
            animation="wave"
            width={40}
            height={16}
            sx={skeletonStyles}
          />
        </div>
      </Stack>
    </div>
  );
}
