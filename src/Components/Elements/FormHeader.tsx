type Props = { title: string };

export default function FormHeader({ title }: Props) {
  return (
    <div className="bg-[#DB4444] py-6 text-center">
      <h1 className="text-[48px] font-bold tracking-widest text-white">
        {title}
      </h1>
    </div>
  );
}
