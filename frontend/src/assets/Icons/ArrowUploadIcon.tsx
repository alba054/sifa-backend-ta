import React from "react";
import { ISvgProps } from "src/interfaces/common.interface";

const ArrowUploadIcon: React.FC<ISvgProps> = ({
  fill,
  size = 24,
  ...props
}) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 14 18"
      fill="none"
      {...props}
    >
      <path
        d="M1.37505 1.91333H12.6234C12.7817 1.91307 12.934 1.85277 13.0495 1.7446C13.1651 1.63642 13.2353 1.48844 13.2459 1.33052C13.2566 1.17259 13.207 1.0165 13.1071 0.893751C13.0071 0.771001 12.8644 0.690737 12.7076 0.669163L12.6234 0.66333H1.37505C1.2167 0.663379 1.06427 0.723534 0.94856 0.83164C0.832851 0.939747 0.762492 1.08775 0.751699 1.24573C0.740905 1.40371 0.790483 1.55991 0.890414 1.68275C0.990345 1.80558 1.13318 1.88591 1.29005 1.9075L1.37505 1.91333ZM6.90255 17.3283L7.00005 17.3333C7.20417 17.3333 7.40117 17.2584 7.5537 17.1227C7.70623 16.9871 7.80367 16.8002 7.82755 16.5975L7.83339 16.5V6.00833L10.5784 8.7525C10.7219 8.89598 10.9128 8.98217 11.1153 8.9949C11.3178 9.00764 11.5181 8.94604 11.6784 8.82166L11.7567 8.7525C11.9002 8.609 11.9864 8.41809 11.9991 8.21557C12.0119 8.01304 11.9503 7.81283 11.8259 7.6525L11.7567 7.57416L7.59255 3.41C7.44906 3.26652 7.25814 3.18032 7.05562 3.16759C6.8531 3.15486 6.65289 3.21645 6.49255 3.34083L6.41422 3.41L2.24422 7.57416C2.09318 7.72378 2.00503 7.92547 1.99782 8.13795C1.99061 8.35043 2.06488 8.55764 2.20544 8.71715C2.346 8.87666 2.54221 8.97642 2.75391 8.996C2.96561 9.01558 3.17679 8.95352 3.34422 8.8225L3.42255 8.75333L6.16672 6.0125V16.5C6.16654 16.7043 6.24139 16.9015 6.37704 17.0542C6.51269 17.2069 6.6997 17.3044 6.90255 17.3283Z"
        fill={fill || "#334155"}
      />
    </svg>
  );
};
export default ArrowUploadIcon;
