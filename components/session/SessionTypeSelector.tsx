"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, Phone, Video } from "lucide-react";

type Props = { selectedType: string };

export default function SessionTypeSelector({ selectedType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateType = (type: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    router.replace(`?${params.toString()}`);
  };

  const types = [
    { key: "chat", icon: <MessageCircle />, label: "Chat" },
    { key: "video", icon: <Video />, label: "Video" },
    { key: "call", icon: <Phone />, label: "Call" },
  ];

  return (
    <div className="space-y-2">
      {types.map(({ key, icon, label }) => (
        <div
          key={key}
          onClick={() => updateType(key)}
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedType === key ? "ring-2 ring-primary" : ""
          }`}
        >
          {icon} <span>{label} Session</span>
        </div>
      ))}
    </div>
  );
}
