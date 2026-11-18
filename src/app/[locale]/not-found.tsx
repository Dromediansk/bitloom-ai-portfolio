import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { chapter } from "@/lib/loom/chapters";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section {...chapter("top", t("title"), "plain", "cobalt")} className="loom-g-paper loom-masthead nf">
      <div className="loom-wrap">
        <p className="loom-page-h1 nf__code" aria-hidden="true">
          {t("code")}
        </p>
        <h1 className="loom-display loom-h2">{t("title")}</h1>
        <p className="loom-lede loom-lede--spaced">
          {t("description")}
        </p>
        <p className="nf__actions">
          <Link className="loom-btn" href="/">
            {t("backHome")}
          </Link>
          <Link className="loom-arrow-link" href="/contact">
            {t("contactUs")}
          </Link>
        </p>
      </div>
    </section>
  );
}
