// id is a uuid
type User = {
  id: string;
  name: string;
  email: string;
  subscription: "free" | "pro";
  getAvatar(): string;
  getSubscriptionColor(): string;
};

export const user = {
  id: "e8e7b4b4-7e6a-4b3e-8d5d-1c0f1e0c5b5e",
  name: "Krisztian Olah",
  email: "krisztian.olah@example.com",
  subscription: "pro",
  getAvatar() {
    return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${this.id}`;
  },
  getSubscriptionColor() {
    return this.subscription === "free" ? "#e5e7eb" : "#8b5cf6";
  },
} satisfies User;
