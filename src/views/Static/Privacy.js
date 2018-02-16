import React, { Component } from 'react';
import styled from 'styled-components';

export default class Privacy extends Component {
  render() {
    return (
      <Page>
        <h1>PRIVACY POLICY</h1>

        <section>
          <p>
            This privacy policy governs your use of the software application
            Screenhole (“Application”) for mobile devices that was created by
            Thinko, LLC. The Application is an app for iOS, Android, and other
            platforms.
          </p>
          <h2>
            What information does the Application obtain and how is it used?
          </h2>
          <p>
            <strong>User Provided Information</strong>
          </p>
          <p>
            The Application obtains the information you provide when you
            download and register the Application. Registration with us is
            optional. However, please keep in mind that you may not be able to
            use some of the features offered by the Application unless you
            register with us.
          </p>{' '}
          <p>
            When you register with us and use the Application, you generally
            provide (a) your name, email address, age, user name, password and
            other registration information; (b) transaction-related information,
            such as when you make purchases, respond to any offers, or download
            or use applications from us; (c) information you provide us when you
            contact us for help; (d) credit card information for purchase and
            use of the Application, and; (e) information you enter into our
            system when using the Application, such as contact information and
            project management information.
          </p>
          <p>
            We may also use the information you provided us to contact your from
            time to time to provide you with important information, required
            notices and marketing promotions.
          </p>
          <p>
            <strong>Automatically Collected Information</strong>{' '}
          </p>
          <p>
            In addition, the Application may collect certain information
            automatically, including, but not limited to, the type of mobile
            device you use, your mobile devices unique device ID, the IP address
            of your mobile device, your mobile operating system, the type of
            mobile Internet browsers you use, and information about the way you
            use the Application.{' '}
          </p>
          <h2>
            Does the Application collect precise real time location information
            of the device?
          </h2>
          <p>
            This Application does not collect precise information about the
            location of your mobile device.{' '}
          </p>
          <h2>
            Do third parties see and/or have access to information obtained by
            the Application?
          </h2>
          <p>
            Only aggregated, anonymized data is periodically transmitted to
            external services to help us improve the Application and our
            service. We will share your information with third parties only in
            the ways that are described in this privacy statement.
          </p>
          <p>
            We may disclose User Provided and Automatically Collected
            Information:
          </p>
          <ol>
            <li>
              as required by law, such as to comply with a subpoena, or similar
              legal process;
            </li>
            <li>
              when we believe in good faith that disclosure is necessary to
              protect our rights, protect your safety or the safety of others,
              investigate fraud, or respond to a government request;
            </li>
            <li>
              with our trusted services providers who work on our behalf, do not
              have an independent use of the information we disclose to them,
              and have agreed to adhere to the rules set forth in this privacy
              statement.
            </li>
            <li>
              if Thinko, LLC is involved in a merger, acquisition, or sale of
              all or a portion of its assets, you will be notified via email
              and/or a prominent notice on our Web site of any change in
              ownership or uses of this information, as well as any choices you
              may have regarding this information.
            </li>
          </ol>
          <h2>What are my opt-out rights?</h2>
          <p>
            You can stop all collection of information by the Application easily
            by uninstalling the Application. You may use the standard uninstall
            processes as may be available as part of your mobile device or via
            the mobile application marketplace or network.
          </p>
          <h2>
            <strong>Data Retention Policy, Managing Your Information</strong>
          </h2>
          <p>
            We will retain User Provided data for as long as you use the
            Application and for a reasonable time thereafter. We will retain
            Automatically Collected information for up to 24 months and
            thereafter may store it in aggregate. If you’d like us to delete
            User Provided Data that you have provided via the Application,
            please contact us at{' '}
            <a href="mailto:privacy@thinko.com">privacy@thinko.com</a> we will
            respond in a reasonable time. Please note that some or all of the
            User Provided Data may be required in order for the Application to
            function properly.
          </p>
          <h2>
            <strong>Children</strong>
          </h2>
          <p>
            We do not use the Application to knowingly solicit data from or
            market to children under the age of 13. If a parent or guardian
            becomes aware that his or her child has provided us with information
            without their consent, he or she should contact us at{' '}
            <a href="mailto:privacy@thinko.com">privacy@thinko.com</a> We will
            delete such information from our files within a reasonable time.
          </p>
          <h2>
            <strong>Security</strong>
          </h2>
          <p>
            We are concerned about safeguarding the confidentiality of your
            information. We provide physical, electronic, and procedural
            safeguards to protect information we process and maintain. For
            example, we limit access to this information to authorized employees
            and contractors who need to know that information in order to
            operate, develop or improve our Application. Please be aware that,
            although we endeavor provide reasonable security for information we
            process and maintain, no security system can prevent all potential
            security breaches.
          </p>
          <h2>
            <strong>Changes</strong>
          </h2>
          <p>
            This Privacy Policy may be updated from time to time for any reason.
            We will notify you of any changes to our Privacy Policy by posting
            the new Privacy Policy screenhole.net/privac-policy.html and
            informing you via application update notes. You are advised to
            consult this Privacy Policy regularly for any changes, as continued
            use is deemed approval of all changes.
          </p>
          <h2>
            <strong>Your Consent</strong>
          </h2>
          <p>
            By using the Application, you are consenting to our processing of
            your information as set forth in this Privacy Policy now and as
            amended by us. "Processing," means using cookies on a computer/hand
            held device or using or touching information in any way, including,
            but not limited to, collecting, storing, deleting, using, combining
            and disclosing information, all of which activities will take place
            in the United States. If you reside outside the United States your
            information will be transferred, processed and stored there under
            United States privacy standards.{' '}
          </p>
          <h2>Contact us</h2>
          <p>
            If you have any questions regarding privacy while using the
            Application, or have questions about our practices, please contact
            us via email at{' '}
            <a href="mailto:privacy@thinko.com">privacy@thinko.com</a>
          </p>
        </section>
      </Page>
    );
  }
}

const Page = styled.div`
  margin: 0 auto 50px auto;
  padding: 50px;
  @media (max-width: 790px) {
    padding: 0;
  }
  max-width: 1000px;
  section {
    color: #858090;
    line-height: 150%;
    & + section {
      margin-top: 100px;
    }
    h1 + h2 {
      margin-top: 3rem;
    }
    p + h2,
    p + h1 {
      margin-top: 5rem;
    }
    p,
    ol,
    ul {
      max-width: 640px;
      margin-top: 1.5rem;
    }

    ol,
    ul {
      margin: 20px 40px;
    }

    code {
      display: inline-block;
      clear: both;
      background-color: rgba(255, 255, 255, 0.1);
      padding: 0.15em 0.25em;
    }
    a {
      color: $purple;
    }
  }
  img {
    display: block;
    max-width: 100%;
    border-radius: 5px;
  }
`;
