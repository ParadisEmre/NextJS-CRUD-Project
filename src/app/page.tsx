import UsersPage from "./users/page";
import dbConnect from "./utils/dbConnect";

export default function Home() {
  dbConnect();
  return (
    <main>
      <UsersPage />
    </main>
  );
}
