import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        className:
          "bg-white text-gray-900 px-6 py-4 rounded-lg shadow-lg border border-gray-200",
        duration: 4000,
        style: {
          fontSize: "1rem",
          fontWeight: "500",
        },
        success: {
          icon: "✅",
          style: {
            background: "#ecfdf5",
            color: "#065f46",
            border: "1px solid #34d399",
          },
        },
        error: {
          icon: "❌",
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #f87171",
          },
        },
      }}
    />
  );
}
