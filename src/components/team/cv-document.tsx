import type { ReactNode } from "react";
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  Polygon,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { buildLinks } from "@/components/team/social-links";
import { initials } from "@/components/ui/avatar";
import { contact } from "@/lib/contact";
import { roleLabel } from "@/lib/roles";
import { siteUrl } from "@/lib/site";
import type { Project, TeamMember } from "@/lib/types";
import { period } from "@/lib/utils";

/*
  CV en PDF de una persona del equipo («Descargar CV»), con los mismos datos y
  secciones que su perfil. Lo genera src/app/equipo/[slug]/cv/route.ts. Usa
  Helvetica (viene en todo PDF), que trae tildes, eñes y signos del español.
*/

/** Imagen lista para react-pdf, que solo acepta JPG y PNG. */
export type PdfImage = { data: Buffer; format: "jpg" | "png" };

// Sin guiones de corte: las reglas que trae react-pdf son del inglés.
Font.registerHyphenationCallback((word) => [word]);

// Mismos colores que el @theme de globals.css (react-pdf no lee CSS).
const color = {
  navy: "#083189",
  brand600: "#0562c0",
  brand500: "#0274d7",
  brand100: "#d9e8fc",
  brand50: "#eef5ff",
  sky: "#018cf5",
  ink: "#0b1b3a",
  inkSoft: "#37445a",
  muted: "#5b6b82",
  line: "#e2e8f0",
  whatsapp: "#128c4a",
};

const s = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingHorizontal: 36,
    paddingBottom: 50,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: color.inkSoft,
  },
  corner: { position: "absolute", top: 0, right: 0 },
  header: { flexDirection: "row", alignItems: "center", gap: 16, paddingRight: 110 },
  photo: { width: 68, height: 68, borderRadius: 34, objectFit: "cover" },
  initials: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: color.brand500,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
  },
  headerText: { flex: 1 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 21, lineHeight: 1.15, color: color.navy },
  role: { marginTop: 3, fontSize: 11, color: color.brand600 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 7 },
  chip: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 8,
    backgroundColor: color.brand50,
    fontSize: 8,
    color: color.navy,
  },
  available: { backgroundColor: "#e7f4ec", color: color.whatsapp },
  company: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    fontSize: 8.5,
    color: color.muted,
  },
  logo: { width: 18, height: 14, objectFit: "contain" },
  body: { flexDirection: "row", gap: 22, marginTop: 16 },
  main: { flex: 1.6 },
  side: { flex: 1 },
  section: { marginBottom: 14 },
  sectionTitle: {
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: color.brand600,
  },
  item: {
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: color.brand100,
  },
  lead: { fontFamily: "Helvetica-Bold", color: color.ink },
  text: { marginTop: 2 },
  itemTitle: { fontFamily: "Helvetica-Bold", fontSize: 10, color: color.ink },
  itemSub: { marginTop: 1, fontSize: 8.5, color: color.muted },
  link: { color: color.brand600, textDecoration: "none" },
  linkLabel: { fontFamily: "Helvetica-Bold", fontSize: 8.5, color: color.ink },
  // Un Text suelto: un View absoluto con `bottom`, o un Text con `render`
  // (número de página), salen fuera de la hoja en react-pdf 4.
  footer: { position: "absolute", bottom: 22, left: 36, fontSize: 7.5, color: color.muted },
});

const host = siteUrl.replace(/^https?:\/\//, "");

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <View style={s.chips}>
      {items.map((item) => (
        <Text key={item} style={s.chip}>
          {item}
        </Text>
      ))}
    </View>
  );
}

export function CvDocument({
  member,
  projects,
  photo,
  logo,
}: {
  member: TeamMember;
  projects: Project[];
  photo: PdfImage | null;
  logo: PdfImage;
}) {
  const links = buildLinks(member);
  const badges = member.roles.map(roleLabel);
  if (member.years_experience != null)
    badges.push(`${member.years_experience}+ años de experiencia`);
  const hasStudies =
    member.education.length > 0 || member.certifications.length > 0;

  return (
    <Document title={`CV — ${member.name}`} author="Dynamic Coding" language="es">
      <Page size="A4" style={s.page}>
        {/* Corte diagonal de la marca, en la esquina */}
        <Svg style={s.corner} width={150} height={92} viewBox="0 0 150 92">
          <Polygon points="58,0 150,0 150,92 18,92" fill={color.navy} />
          <Polygon points="44,0 52,0 12,92 4,92" fill={color.sky} />
        </Svg>

        <View style={s.header}>
          {photo ? (
            // eslint-disable-next-line jsx-a11y/alt-text -- es un PDF, no HTML
            <Image src={photo} style={s.photo} />
          ) : (
            <View style={s.initials}>
              <Text>{initials(member.name)}</Text>
            </View>
          )}
          <View style={s.headerText}>
            <Text style={s.name}>{member.name}</Text>
            <Text style={s.role}>
              {[member.role, member.location].filter(Boolean).join("  ·  ")}
            </Text>
            <View style={s.chips}>
              {badges.map((badge) => (
                <Text key={badge} style={s.chip}>
                  {badge}
                </Text>
              ))}
              {member.available && (
                <Text style={[s.chip, s.available]}>Disponible para consultas</Text>
              )}
            </View>
          </View>
        </View>

        <View style={s.company}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- es un PDF, no HTML */}
          <Image src={logo} style={s.logo} />
          <Text>
            Dynamic Coding · WhatsApp {contact.whatsappDisplay} · {host}
          </Text>
        </View>

        <View style={s.body}>
          <View style={s.main}>
            {(member.headline || member.bio) && (
              <Section title="Sobre mí">
                {member.headline ? <Text style={s.lead}>{member.headline}</Text> : null}
                {member.bio ? <Text style={s.text}>{member.bio}</Text> : null}
              </Section>
            )}

            {member.experience.length > 0 && (
              <Section title="Experiencia">
                {member.experience.map((item) => (
                  <View key={`${item.title}-${item.start}`} style={s.item} wrap={false}>
                    <Text style={s.itemTitle}>{item.title}</Text>
                    <Text style={s.itemSub}>
                      {[item.organization, period(item.start, item.end)]
                        .filter(Boolean)
                        .join(" · ")}
                    </Text>
                    {item.description ? <Text style={s.text}>{item.description}</Text> : null}
                  </View>
                ))}
              </Section>
            )}

            {hasStudies && (
              <Section title="Formación y certificaciones">
                {member.education.map((item) => (
                  <View key={`${item.title}-${item.institution}`} style={s.item} wrap={false}>
                    <Text style={s.itemTitle}>{item.title}</Text>
                    <Text style={s.itemSub}>
                      {[item.institution, item.year].filter(Boolean).join(" · ")}
                    </Text>
                  </View>
                ))}
                {member.certifications.map((cert) => (
                  <View key={cert.name} style={s.item} wrap={false}>
                    <Text style={s.itemTitle}>{cert.name}</Text>
                    <Text style={s.itemSub}>
                      {[cert.issuer, cert.year].filter(Boolean).join(" · ")}
                      {cert.url ? (
                        <Link src={cert.url} style={s.link}>
                          {"   Verificar"}
                        </Link>
                      ) : null}
                    </Text>
                  </View>
                ))}
              </Section>
            )}

            {projects.length > 0 && (
              <Section title="Proyectos en los que participó">
                {projects.map((project) => (
                  <View key={project.id} style={s.item} wrap={false}>
                    <Link src={`${siteUrl}/proyectos/${project.slug}`} style={s.link}>
                      <Text style={s.itemTitle}>{project.title}</Text>
                    </Link>
                    <Text style={s.itemSub}>{project.category}</Text>
                  </View>
                ))}
              </Section>
            )}
          </View>

          <View style={s.side}>
            {member.skills.length > 0 && (
              <Section title="Habilidades">
                <Chips items={member.skills} />
              </Section>
            )}

            {links.length > 0 && (
              <Section title="Contacto y redes">
                {links.map(({ href, label }) => (
                  <View key={label} style={s.item}>
                    <Text style={s.linkLabel}>{label}</Text>
                    <Link src={href} style={s.link}>
                      {href.replace(/^(mailto:|https?:\/\/(www\.)?)/, "")}
                    </Link>
                  </View>
                ))}
              </Section>
            )}
          </View>
        </View>

        <Text style={s.footer} fixed>
          {host}/equipo/{member.slug}
        </Text>
      </Page>
    </Document>
  );
}
