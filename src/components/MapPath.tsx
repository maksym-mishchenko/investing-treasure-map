export default function MapPath({ color = '#ff1744' }: { color?: string }) {
  return (
    <div className="flex justify-center py-1">
      <svg width="4" height="48" viewBox="0 0 4 48" fill="none" aria-hidden="true">
        <line
          x1="2"
          y1="0"
          x2="2"
          y2="48"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}
