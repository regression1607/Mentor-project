"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, Phone, Video } from "lucide-react";

type Props = {
  selectedType: string;
  pricing: { chat: number; video: number; call: number };
};

export default function SessionTypeSelector({ selectedType, pricing }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateType = (type: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    router.replace(`?${params.toString()}`);
  };
  const iconClassName = "h-5 w-5 mr-3 text-primary";

  const types = [
    {
      key: "chat",
      icon: <MessageCircle className={iconClassName} />,
      label: "Chat",
      pricing: pricing["chat"],
    },
    {
      key: "video",
      icon: <Video className={iconClassName} />,
      label: "Video",
      pricing: pricing["video"],
    },
    {
      key: "call",
      icon: <Phone className={iconClassName} />,
      label: "Call",
      pricing: pricing["call"],
    },
  ];

  return (
    <div className="space-y-2">
      {types.map(({ key, icon, label, pricing }) => (
        <div
          key={key}
          onClick={() => updateType(key)}
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
            selectedType === key ? "ring-2 ring-primary" : ""
          }`}
        >
          <div className="flex items-center">
            {icon} <span>{label} Session</span>
          </div>
          <span className="font-semibold">${pricing}/hr</span>
        </div>
      ))}
    </div>
  );
}
