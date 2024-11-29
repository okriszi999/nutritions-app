import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { t } = useTranslation("home");
  return (
    <div className="p-2">
      <h3>{t("welcome")}</h3>
    </div>
  );
}
