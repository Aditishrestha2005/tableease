import ResetPasswordForm from "../_components/ResetPasswordForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <div className="p-6">
        <p className="text-red-600">Invalid or missing token.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ResetPasswordForm token={token} />
    </div>
  );
}