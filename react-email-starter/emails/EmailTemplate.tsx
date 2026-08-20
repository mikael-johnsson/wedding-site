import { Body, Container, Head, Heading, Html, Text } from "react-email";

type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};
const EmailTemplate = ({ name, email, message }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ fontSize: "24px", marginBottom: "20px" }}>
            Anmälan av tal{name}
          </Heading>
          <Text
            style={{
              fontSize: "16px",
              marginBottom: "10px",
              fontStyle: "italic",
            }}
          >
            Det här mailet kommer från Olivia och Simons bröllopssida
          </Text>
          <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>Namn:</strong> {name}
          </Text>
          <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
            <strong>Meddelande:</strong>
          </Text>
          <Text style={{ fontSize: "16px", whiteSpace: "pre-wrap" }}>
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
