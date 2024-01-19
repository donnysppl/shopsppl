
import {
  Body, Heading,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

export const Email = ({ url }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Section style={header}>
            <Img
              src={'https://thomson.shopsppl.net/img/logo.png'}
              width="180"
              alt="SPPL-logo" style={logo}
            />
          </Section>
          <Section style={innerbox}>

            <Text style={paragraph}>Verify Your Identity</Text>
            <Heading style={paragraph}>
              Enter the following code to verify your account.
            </Heading>
            <Section style={codeContainer}>
              <Text style={code}>{'123456'}</Text>
            </Section>
            
            <Hr style={hr} />
          <Text style={footer}>
            — The Super Plastronics Pvt Ltd team , S-24, Pocket S, Okhla Phase II, Okhla, New Delhi, Delhi 110020
          </Text>


          </Section>
          
        </Section>
      </Container>
    </Body>
  </Html>
);

export const OTPEmail = ({ url,otp }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Section style={header}>
            <Img
              src={'https://thomson.shopsppl.net/img/logo.png'}
              width="180"
              alt="SPPL-logo" style={logo}
            />
          </Section>
          <Section style={innerbox}>

            <Text style={paragraph}>Verify Your Identity</Text>
            <Heading style={paragraph}>
              Enter the following code to verify your account.
            </Heading>
            <Section style={codeContainer}>
              <Text style={code}>{otp}</Text>
            </Section>
            
            <Hr style={hr} />
          <Text style={footer}>
            — The Super Plastronics Pvt Ltd team , S-24, Pocket S, Okhla Phase II, Okhla, New Delhi, Delhi 110020
          </Text>


          </Section>
          
        </Section>
      </Container>
    </Body>
  </Html>
);

export const OrderCompleteEmail = ({ url,otp }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Section style={header}>
            <Img
              src={'/img/logo.png'}
              width="180"
              alt="SPPL-logo" style={logo}
            />
          </Section>
          <Section style={innerbox}>

            <Text style={paragraph}>Verify Your Identity</Text>
            <Heading style={paragraph}>
              Enter the following code to verify your account.
            </Heading>
            <Section style={codeContainer}>
              <Text style={code}>{otp}</Text>
            </Section>
            
            <Hr style={hr} />
          <Text style={footer}>
            — The Super Plastronics Pvt Ltd team , S-24, Pocket S, Okhla Phase II, Okhla, New Delhi, Delhi 110020
          </Text>


          </Section>
          
        </Section>
      </Container>
    </Body>
  </Html>
);

export default Email;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '0',
};
const box = {
  padding: '0 0',
  backgroundColor: '#fff',
};
const innerbox = {
  padding: '0 40px',
};
const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};
const header = {
  backgroundColor: '#013088',
  width:'100%',
}
const logo = {
  margin: '0 auto',
  padding: "15px",
}
const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left',
};
const anchor = {
  color: '#556cd6',
};
const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '100%',
  padding: '10px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
const code = {
  color: '#000',
  display: 'inline-block',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  width: '100%',
  textAlign: 'center',
};
const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '16px auto 14px',
  verticalAlign: 'middle',
  width: '280px',
};