import { changePremium, changeUsername, getSession } from "@/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome to the ProfilePage</h1>
      <p>
        Welcome, <b>{session.username}</b>
      </p>
      <span>
        yur are a <b>{session.isPro ? "Premium" : "Free"}</b> user
      </span>
      <form action={changePremium}>
        <button>{session.isPro ? "Canel" : "Buy"} Premium</button>
      </form>
      <form action={changeUsername}>
        <input
          type="text"
          name="username"
          required
          placeholder={session.username}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;
