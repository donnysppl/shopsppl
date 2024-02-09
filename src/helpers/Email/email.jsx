
import {
  Body, Heading,
  Button, Row, Column,
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
import moment from 'moment';
import * as React from 'react';
import { priceFormat } from '../common';


const logourl = "https://shopsppl.in/img/logo.png"
export const Email = ({ url }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Section style={header}>
            <Img
              src={logourl}
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

export const OTPEmail = ({ url, otp }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Section style={header}>
            <Img
              src={logourl}
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

export const OrderCompleteEmail = ({ orderData }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Section style={header}>
            <Img
              src={logourl}
              width="180"
              alt="SPPL-logo" style={logo}
            />
          </Section>
          <Section style={innerbox}>


            <Heading style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '20px',
              padding: "10px 0",
            }}>
              Your order has been placed
            </Heading>


            <Heading style={{
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '16px',

            }}>
              Hey, {orderData?.name}
            </Heading>
            <Text style={{ fontWeight: "400", margin: "0", textAlign: 'left', fontSize: '14px' }}>
              Your order has been confirmed and will be shipping soon.
            </Text>
            <Hr style={hr} />
            <Section>
              <Row >
                <Column>
                  <Heading style={{
                    textAlign: 'left', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '200%',
                  }}>
                    Order Number
                  </Heading>
                  <Text style={{ fontWeight: "600", margin: "0", textAlign: 'left', fontSize: '12px' }}>
                    {orderData?.sppl_orderid}
                  </Text>

                </Column>
                <Column>
                  <Heading style={{
                    textAlign: 'left', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '200%',
                  }}>
                    Order Date
                  </Heading>
                  <Text style={{ fontWeight: "600", margin: "0", textAlign: 'left', fontSize: '12px' }}>
                    {moment(orderData?.createdAt).format('ll')}
                  </Text>

                </Column>
                <Column>
                  <Heading style={{
                    textAlign: 'left', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '200%',
                  }}>
                    Payment ID
                  </Heading>
                  <Text style={{ fontWeight: "600", margin: "0", textAlign: 'left', fontSize: '12px' }}>
                    {orderData?.paymentid}
                  </Text>

                </Column>
              </Row>
            </Section>
            <Hr style={hr} />

            <Section
              style={{}}
            >
              <Row style={{
                borderBottom: '1px solid #e6ebf1',
              }}>
                <Column style={{ width: '60%', float: 'left', }}>
                  <Heading style={{
                    textAlign: 'left', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '250%',
                  }}>
                    Product Details
                  </Heading>
                </Column>
                <Column style={{ width: '20%', float: 'left', }}>
                  <Heading style={{
                    textAlign: 'left', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '300%', textAlign: 'center'
                  }}>
                    Quantity
                  </Heading>
                </Column>
                <Column style={{ width: '20%', float: 'right', }}>
                  <Heading style={{
                    textAlign: 'right', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '300%',
                  }}>
                    Amount
                  </Heading>
                </Column>
              </Row>
              {
                orderData.orderprod.map((item, index) => (
                  <Row key={index} >
                    <Column style={{ width: '60%', float: 'left', paddingTop: '6px' }}>
                      <Heading style={{
                        textAlign: 'left', fontWeight: '500', fontSize: '12px',
                        color: '#000', lineHeight: '150%',
                      }}>
                        {item.productname}
                      </Heading>
                    </Column>
                    <Column style={{ width: '20%', float: 'left', paddingTop: '6px' }}>
                      <Heading style={{
                        textAlign: 'left', fontWeight: '500', fontSize: '12px',
                        color: '#000', lineHeight: '150%', textAlign: 'center'
                      }}>
                        {item.quantity}
                      </Heading>
                    </Column>
                    <Column style={{ width: '20%', float: 'right', paddingTop: '6px' }}>
                      <Heading style={{
                        textAlign: 'right', fontWeight: '500', fontSize: '12px',
                        color: '#000', lineHeight: '150%',
                      }}>
                        {priceFormat(item.productsaleprice)}
                      </Heading>
                    </Column>
                  </Row>
                ))
              }


              <Hr style={hr} />
              <Text style={{ fontWeight: "500", margin: "0", textAlign: 'right', paddingRight: '12px', }}>Total Product Price :  {priceFormat(orderData.totalprodprice)}</Text>
              <Text style={{ fontWeight: "500", margin: "0", textAlign: 'right', paddingRight: '12px', }}>Total Discount :  {priceFormat(orderData.discountammount)}</Text>
              <Section>
                <Text style={{ fontWeight: "600", margin: "0", textAlign: 'right', paddingRight: '12px', borderTop: '1px solid #000', borderBottom: '1px solid #000', display: "inline-block", float: 'right', fontSize: '16px' }}>Total Bill :  {priceFormat(orderData.totalbill)}</Text>
              </Section>

              <Text style={{ fontWeight: "400", margin: "0", textAlign: 'left', fontSize: '12px', paddingTop: '10px', marginTop: '15px', borderTop: '1px solid #e6ebf1' }}>
                Ww will send you shipping confirmation when your item(s) are on the way! We appreciate your business, and hope you enjoy your purchase.
              </Text>
            </Section>


            <Text style={footer}>
              — The Super Plastronics Pvt Ltd team , S-24, Pocket S, Okhla Phase II, Okhla, New Delhi, Delhi 110020
            </Text>


          </Section>

        </Section>
      </Container>
    </Body>
  </Html>
);


export const EkartDetailsEmail = ({ orderData }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Section style={header}>
            <Img
              src={logourl}
              width="180"
              alt="SPPL-logo" style={logo}
            />
          </Section>
          <Section style={innerbox}>


            <Heading style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '20px',
              padding: "10px 0",
            }}>
              Your order has been shipped
            </Heading>


            <Heading style={{
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '16px',

            }}>
              Hey, {orderData?.name}
            </Heading>
            <Text style={{ fontWeight: "400", margin: "0", textAlign: 'left', fontSize: '14px' }}>
              Your order has been shipped .
            </Text>
            <Hr style={hr} />
            <Section>
              <Row >
                <Column style={{
                  width: '40%'
                }}>
                  <Heading style={{
                    textAlign: 'left', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '200%',
                  }}>
                    Order Number
                  </Heading>
                  <Text style={{ fontWeight: "600", margin: "0", textAlign: 'left', fontSize: '12px' }}>
                    {orderData?.sppl_orderid}
                  </Text>

                </Column>
                <Column style={{
                  width: '60%'
                }}>
                  <Heading style={{
                    textAlign: 'left', fontWeight: '500', fontSize: '12px',
                    color: '#878a99', lineHeight: '200%',
                  }}>
                    Tracking ID
                  </Heading>
                  <Text style={{ fontWeight: "600", margin: "0", textAlign: 'left', fontSize: '12px' }}>
                    {Array.isArray(orderData?.ekartData[0]) ?
                      orderData?.ekartData[0].map((item, index) => (
                        <span className="" key={index}>{item.trackingid}, </span>
                      )) : orderData?.ekartData[0].trackingID
                    }
                  </Text>

                </Column>
              </Row>
            </Section>
            <Hr style={hr} />

            <Section>
              <Text style={{ fontWeight: "500", margin: "0", textAlign: 'center', fontSize: '16px', paddingBottom: '8px' }}>
                Want to track your order
              </Text>
              <Button style={button} href={'https://shopspplekart.vercel.app/customer/tracking'}>
                Track Now
              </Button>
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
const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

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
  padding: '0 10px',
};
const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};
const header = {
  backgroundColor: '#013088',
  width: '100%',
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
  backgroundColor: '#F6AF17',
  borderRadius: '20px',
  color: '#000',
  fontSize: '18px',
  fontWeight: '600',
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