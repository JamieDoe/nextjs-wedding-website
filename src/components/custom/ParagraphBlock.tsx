import { Separator } from "@/components";

export default function ParagraphBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-col gap-2 w-fit">
        <h3 className="text-4xl font-lovelace gap-5">{title}</h3>
        <Separator />
      </div>
      <p className="text-[18px] font-lovelace leading-relaxed">{text}</p>
    </div>
  );
}
