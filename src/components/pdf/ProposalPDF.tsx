import { Document, Page, View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import type { ProposalDisplayData } from "@/lib/utils/proposalData";

const FONT_BASE = typeof window !== "undefined" ? window.location.origin : "";

Font.register({
  family: "Roboto",
  fonts: [
    { src: `${FONT_BASE}/fonts/Roboto-Regular.ttf`, fontWeight: 400 },
    { src: `${FONT_BASE}/fonts/Roboto-Bold.ttf`, fontWeight: 700 },
    { src: `${FONT_BASE}/fonts/Roboto-Black.ttf`, fontWeight: 900 },
  ],
});

const c = {
  blue: "#194973",
  blueDark: "#0f3150",
  green: "#71C648",
  gray: "#5A6D6D",
  lightGray: "#f8f9fa",
  white: "#ffffff",
  border: "#e5e7eb",
  red: "#dc2626",
  redLight: "#fef2f2",
  greenLight: "#f0fdf4",
};

const s = StyleSheet.create({
  page: { fontFamily: "Roboto", fontSize: 9, color: c.blue, paddingBottom: 60 },
  // Header
  header: { backgroundColor: c.blue, paddingHorizontal: 36, paddingTop: 28, paddingBottom: 24 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  headerLeft: {},
  headerLogoRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  logoCircle: { width: 14, height: 14, borderRadius: 7, backgroundColor: c.green },
  logoCircle2: { width: 14, height: 14, borderRadius: 7, backgroundColor: "rgba(255,255,255,0.3)", marginLeft: -6 },
  businessName: { fontSize: 15, fontWeight: 900, color: c.white, marginLeft: 6 },
  headerSubtitle: { fontSize: 8, fontWeight: 700, color: c.green, letterSpacing: 1, textTransform: "uppercase" },
  headerRight: { textAlign: "right" },
  headerRef: { fontSize: 9, fontWeight: 700, color: c.green, marginBottom: 3 },
  headerDate: { fontSize: 8, color: "rgba(255,255,255,0.5)" },
  // Body
  body: { paddingHorizontal: 36, paddingTop: 24 },
  // Section title
  sectionTitle: { fontSize: 8, fontWeight: 700, color: c.green, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottomWidth: 2, borderBottomColor: "#f0f0f0" },
  // Client card
  clientCard: { backgroundColor: c.lightGray, borderRadius: 10, padding: 16, flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  clientLabel: { fontSize: 7, fontWeight: 700, color: c.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  clientName: { fontSize: 13, fontWeight: 700, color: c.blue, marginBottom: 2 },
  clientDetail: { fontSize: 9, color: c.gray },
  clientEmail: { fontSize: 9, color: c.green },
  // Project
  projectName: { fontSize: 15, fontWeight: 900, color: c.blue, marginBottom: 6 },
  projectDesc: { fontSize: 10, color: c.gray, lineHeight: 1.6 },
  section: { marginBottom: 18 },
  // Deliverables
  deliverableItem: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: c.lightGray, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: c.green, marginBottom: 5 },
  deliverableNum: { fontSize: 9, fontWeight: 900, color: c.green, width: 22 },
  deliverableText: { fontSize: 10, fontWeight: 500, color: c.blue, flex: 1 },
  // Process
  processRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  processStep: { flex: 1, backgroundColor: c.lightGray, borderRadius: 10, padding: 14, alignItems: "center" },
  processCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: c.blue, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  processCircleText: { fontSize: 10, fontWeight: 900, color: c.green },
  processTitle: { fontSize: 9, fontWeight: 700, color: c.blue, marginBottom: 4, textAlign: "center" },
  processDesc: { fontSize: 8, color: c.gray, lineHeight: 1.4, textAlign: "center" },
  // Revisions
  revisionCard: { backgroundColor: c.lightGray, borderRadius: 10, padding: 16, borderWidth: 1, borderColor: c.border, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  revisionLabel: { fontSize: 12, fontWeight: 900, color: c.blue },
  revisionSub: { fontSize: 9, color: c.gray, marginTop: 3 },
  revisionCount: { fontSize: 32, fontWeight: 900, color: c.green },
  revisionNote: { backgroundColor: "rgba(113,198,72,0.05)", borderRadius: 8, padding: 10, marginTop: 8 },
  revisionNoteText: { fontSize: 8, color: c.gray, lineHeight: 1.5 },
  // Investment
  investmentCenter: { textAlign: "center", paddingVertical: 14 },
  investmentLabel: { fontSize: 8, fontWeight: 700, color: c.gray, textTransform: "uppercase", letterSpacing: 1 },
  investmentTotal: { fontSize: 30, fontWeight: 900, color: c.blue, marginTop: 4 },
  investmentVat: { fontSize: 9, color: c.gray, marginTop: 3 },
  splitsRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  splitFirst: { flex: 1, backgroundColor: c.blue, borderRadius: 10, padding: 14, alignItems: "center" },
  splitOther: { flex: 1, backgroundColor: c.lightGray, borderRadius: 10, padding: 14, alignItems: "center" },
  splitLabel: { fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  splitAmount: { fontSize: 16, fontWeight: 900 },
  splitPct: { fontSize: 8, marginTop: 2 },
  // Timeline
  timelineRow: { flexDirection: "row", gap: 10 },
  timelineCard: { flex: 1, backgroundColor: c.lightGray, borderRadius: 10, padding: 14 },
  timelineLabel: { fontSize: 7, fontWeight: 700, color: c.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  timelineValue: { fontSize: 11, fontWeight: 700, color: c.blue },
  // Notes
  notesText: { fontSize: 10, color: c.gray, lineHeight: 1.6 },
  // Conditions
  conditionItem: { flexDirection: "row", marginBottom: 4, gap: 6 },
  conditionNum: { fontSize: 8, fontWeight: 900, color: c.green, width: 14 },
  conditionText: { fontSize: 8, color: c.gray, lineHeight: 1.5, flex: 1 },
  // Accepted
  acceptedBox: { backgroundColor: c.greenLight, borderWidth: 2, borderColor: c.green, borderRadius: 10, padding: 20, alignItems: "center", marginTop: 8 },
  acceptedTitle: { fontSize: 14, fontWeight: 900, color: c.blue, marginTop: 6 },
  acceptedDate: { fontSize: 9, color: c.gray, marginTop: 4 },
  signatureImage: { width: 140, height: 52, objectFit: "contain", marginTop: 10 },
  // Rejected
  rejectedBox: { backgroundColor: c.redLight, borderWidth: 2, borderColor: "#fca5a5", borderRadius: 10, padding: 20, alignItems: "center", marginTop: 8 },
  rejectedTitle: { fontSize: 14, fontWeight: 900, color: c.blue, marginTop: 6 },
  rejectedDate: { fontSize: 9, color: c.gray, marginTop: 4 },
  rejectedReasonBox: { backgroundColor: c.white, borderRadius: 8, padding: 12, marginTop: 10, width: "100%" },
  rejectedReasonLabel: { fontSize: 7, fontWeight: 700, color: c.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 },
  rejectedReasonText: { fontSize: 9, color: c.blue, lineHeight: 1.5 },
  // Footer
  footer: { position: "absolute", bottom: 20, left: 36, right: 36, textAlign: "center" },
  footerText: { fontSize: 7, color: "#9ca3af" },
});

interface Props {
  data: ProposalDisplayData;
}

export default function ProposalPDF({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerRow}>
            <View style={s.headerLeft}>
              <View style={s.headerLogoRow}>
                <View style={s.logoCircle} />
                <View style={s.logoCircle2} />
                <Text style={s.businessName}>{data.businessName}</Text>
              </View>
              <Text style={s.headerSubtitle}>Propuesta de servicios</Text>
            </View>
            <View style={s.headerRight}>
              <Text style={s.headerRef}>{data.displayId}</Text>
              <Text style={s.headerDate}>{data.displayDate}</Text>
            </View>
          </View>
        </View>

        <View style={s.body}>
          {/* Client Info */}
          <View style={s.clientCard}>
            <View>
              <Text style={s.clientLabel}>Preparado para</Text>
              <Text style={s.clientName}>{data.clientName}</Text>
              {data.clientCompany ? <Text style={s.clientDetail}>{data.clientCompany}</Text> : null}
              {data.clientEmail ? <Text style={s.clientEmail}>{data.clientEmail}</Text> : null}
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={s.clientLabel}>Tipo</Text>
              <Text style={{ fontSize: 9, fontWeight: 700, color: c.blue }}>{data.projectTypeLabel}</Text>
            </View>
          </View>

          {/* Project Description */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Descripcion del proyecto</Text>
            <Text style={s.projectName}>{data.projectName}</Text>
            {data.projectDescription ? <Text style={s.projectDesc}>{data.projectDescription}</Text> : null}
          </View>

          {/* Deliverables */}
          {data.deliverables.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Alcance y entregables</Text>
              <Text style={{ fontSize: 8, color: c.gray, marginBottom: 8, lineHeight: 1.4 }}>
                El proyecto incluye exclusivamente los siguientes entregables. Cualquier elemento no listado aqui se considerara fuera del alcance.
              </Text>
              {data.deliverables.map((d, i) => (
                <View key={i} style={s.deliverableItem}>
                  <Text style={s.deliverableNum}>#{i + 1}</Text>
                  <Text style={s.deliverableText}>{d}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Process */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Proceso de trabajo</Text>
            <View style={s.processRow}>
              {data.processSteps.map((step) => (
                <View key={step.step} style={s.processStep}>
                  <View style={s.processCircle}>
                    <Text style={s.processCircleText}>{step.step}</Text>
                  </View>
                  <Text style={s.processTitle}>{step.title}</Text>
                  <Text style={s.processDesc}>{step.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Revisions */}
          <View style={s.section}>
            <View style={s.revisionCard}>
              <View>
                <Text style={s.revisionLabel}>Rondas de revision incluidas</Text>
                <Text style={s.revisionSub}>Revisiones adicionales: {data.extraRevisionPriceText}</Text>
              </View>
              <Text style={s.revisionCount}>{data.revisionCount}</Text>
            </View>
            <View style={s.revisionNote}>
              <Text style={s.revisionNoteText}>
                <Text style={{ fontWeight: 700 }}>Importante:</Text> Las revisiones cubren ajustes sobre lo desarrollado (textos, colores, imagenes, espaciados). Los cambios estructurales, nuevas funcionalidades o redisenos completos no se consideran revisiones y se presupuestan aparte.
              </Text>
            </View>
          </View>

          {/* Investment */}
          <View style={s.section} wrap={false}>
            <Text style={s.sectionTitle}>Inversion</Text>
            <View style={s.investmentCenter}>
              <Text style={s.investmentLabel}>Precio total</Text>
              <Text style={s.investmentTotal}>{data.totalFormatted}</Text>
              <Text style={s.investmentVat}>IVA no incluido</Text>
            </View>
            {data.paymentSplits && (
              <View style={s.splitsRow}>
                {data.paymentSplits.map((split, i) => (
                  <View key={i} style={split.isFirst ? s.splitFirst : s.splitOther}>
                    <Text style={[s.splitLabel, { color: split.isFirst ? c.green : c.gray }]}>{split.label}</Text>
                    <Text style={[s.splitAmount, { color: split.isFirst ? c.white : c.blue }]}>{split.amount}</Text>
                    <Text style={[s.splitPct, { color: split.isFirst ? "rgba(255,255,255,0.5)" : c.gray }]}>{split.pct}% del total</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Timeline */}
          {(data.startDateFormatted || data.estimatedDays) && (
            <View style={[s.section, s.timelineRow]}>
              {data.startDateFormatted && (
                <View style={s.timelineCard}>
                  <Text style={s.timelineLabel}>Inicio estimado</Text>
                  <Text style={s.timelineValue}>{data.startDateFormatted}</Text>
                </View>
              )}
              {data.estimatedDays && (
                <View style={s.timelineCard}>
                  <Text style={s.timelineLabel}>Plazo estimado</Text>
                  <Text style={s.timelineValue}>{data.estimatedDays}</Text>
                </View>
              )}
            </View>
          )}

          {/* Notes */}
          {data.notes && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Notas</Text>
              <Text style={s.notesText}>{data.notes}</Text>
            </View>
          )}

          {/* Conditions */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Terminos y condiciones</Text>
            {data.conditions.map((cond, i) => (
              <View key={i} style={s.conditionItem}>
                <Text style={s.conditionNum}>{i + 1}.</Text>
                <Text style={s.conditionText}>{cond}</Text>
              </View>
            ))}
          </View>

          {/* Accepted */}
          {data.isAccepted && (
            <View style={s.acceptedBox} wrap={false}>
              <Text style={{ fontSize: 28 }}>&#10003;</Text>
              <Text style={s.acceptedTitle}>Presupuesto aceptado</Text>
              {data.acceptedDate && (
                <Text style={s.acceptedDate}>Firmado por {data.clientNameForSignature} el {data.acceptedDate}</Text>
              )}
              {data.signatureDataUri && (
                <Image src={data.signatureDataUri} style={s.signatureImage} />
              )}
            </View>
          )}

          {/* Rejected */}
          {data.isRejected && (
            <View style={s.rejectedBox} wrap={false}>
              <Text style={{ fontSize: 28 }}>&#10060;</Text>
              <Text style={s.rejectedTitle}>Propuesta rechazada</Text>
              {data.rejectedDate && (
                <Text style={s.rejectedDate}>Rechazada el {data.rejectedDate}</Text>
              )}
              {data.rejectionReason && (
                <View style={s.rejectedReasonBox}>
                  <Text style={s.rejectedReasonLabel}>Motivo</Text>
                  <Text style={s.rejectedReasonText}>{data.rejectionReason}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>CodeConnect - Desarrollo de software a medida | codeconnect.es</Text>
        </View>
      </Page>
    </Document>
  );
}
