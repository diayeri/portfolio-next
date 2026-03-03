import Home from "@/components/Home";

export default async function Page({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const params = await searchParams;
  const roleKey =
    params?.role?.toLowerCase() === "design" ? "design" : "develop";

  return <Home roleKey={roleKey} />;
}
