type Props = { title: string };

export default function FormHeader({ title }: Props) {
  return (
    <div className="bg-[#DB4444] dark:bg-violet-500 transition-colors duration-300 py-6 text-center">
      <h1 className="text-[48px] font-bold tracking-widest text-white">
        {title}
      </h1>
    </div>
  );
}
