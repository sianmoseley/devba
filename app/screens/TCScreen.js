import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {globalStyles} from '../config/Styles';

//basic page with Terms & Conditions info

export default function TCScreen() {
  return (
    <ScrollView style={{padding: 25}}>
      <View style={globalStyles.logoContainer}>
        <Image
          style={{width: 275, height: 238}}
          source={require('../images/bigapp.png')}
        />
      </View>
      <Text style={globalStyles.aboutText}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>
          {'\n'}Terms & Conditions
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}1. Introductions
        </Text>
        <Text>
          {'\n\n'}Welcome to Big APPetite, which is owned by Stephanie Libby,
          Pearl Vernon-Howe, Sian Moseley and Matthew Goostrey (“Big APPetite”
          or “we”).
          {'\n\n'}Big APPetite’s mission is to raise awareness of food waste and
          reduce food waste on university campuses by making surplus food
          available for consumers.
          {'\n\n'}We provide a way for the end user (“Customer”) to be made
          aware of surplus food and beverages (“Products”) on campus. Product
          descriptions may be submitted by any app user (“Advertiser”).
          {'\n\n'}These terms and conditions (“Terms”) apply to any activities
          which are carried out via our app (“Platform”).
          {'\n\n'}When accepting these Terms upon registering as a user of the
          app, the Customer accepts these Terms and thus, the Customer is
          required to review the Terms thoroughly before the Customer offers or
          receives Products through interacting with the Platform.
          {'\n\n'}Big APPetite’s privacy policy, as available at all times on
          the Platform, shall form an integrated part of these Terms and shall
          be automatically accepted upon acceptance of these Terms.
          {'\n\n'}Any correspondence with Big APPetite may be submitted to the
          following e-mail address: bigappetitesd@gmail.com
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}2. Big APPetite Concept
        </Text>
        <Text>
          {'\n\n'}Products are to be offered free of charge by Advertisers. We
          do not guarantee Products will be available or as described.
          {'\n\n'}Big APPetite is solely arranging the advertisement of Products
          on the Platform on behalf of Advertisers and Customers, and there
          shall be no contractual relationship between Big APPetite and the
          Customer with regard to the Products. Big APPetite has no
          responsibilities in respect of the Products.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}3. Acceptance
        </Text>
        <Text>
          {'\n\n'}When receiving Products advertised on the Platform, the
          Customer confirms:
          {'\n\n'}- to be a consumer accepting the Product for personal
          purposes.
          {'\n\n'}By accepting these Terms, Advertisers accept to receive emails
          related to any inaccurate or inappropriate adverts placed by the
          Advertiser. This is required by Big APPetite in order to ensure the
          appropriate use of the platform.
          {'\n\n'}Big APPetite reserves the right to revise and amend the Terms
          from time to time. Customers and Advertisers will be notified of any
          changes to the Terms via the email address provided upon registering
          with the Platform. Customers and Advertisers will be subject to the
          Terms applicable at the time when the amended Terms are sent.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}4. Big APPetit’s contact information and customer service
        </Text>
        <Text>
          {'\n\n'}Reporting feature on the Platform
          {'\n'}Email:{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            bigappetitesd@gmail.com
          </Text>
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}5. Product and Product information
        </Text>
        <Text>
          {'\n\n'}Big APPetite is exclusively advertising Products between the
          Customer and the Advertiser and Big APPetite has no responsibilities
          in respect of the Products.
          {'\n\n'}Big APPetite does not, in any way, manufacture, sell,
          purchase, store, prepare, produce, process, mark, pack, deliver or
          handle the Products. Big APPetite has no responsibility towards the
          Customer regarding the Products, including the manufacturing, sale,
          purchase, storage, preparation, production, processing, marking,
          delivery, quality, ingredients, allergens or handling of the Products,
          and the compliance with applicable legislation, including with respect
          to the above.
          {'\n\n'}The Customer can find information about the Products and a
          description of the Products on the Platform. This information is only
          instructive and for the purpose of giving the Customer the best
          prerequisites for evaluating selected Products before receiving
          Products. There may be instances where the Product is not as stated on
          the Platform. In such cases, Big APPetite is of no liability. It is
          the Advertisers that are responsible for providing information about
          the Products and to ensure that it is factually accurate and
          up-to-date. Big APPetite does not undertake any such responsibility
          and, hence, has no liability for the contents of or availability of
          information regarding the Products.
          {'\n\n'}If the Customer is in doubt about allergy warnings, contents
          of a dish or any other Product information, the Customer shall refrain
          from consuming the Product.
          {'\n\n'}Big APPetite will not assume any liability for Customers’
          adverse reactions from Products for any reasons.
          {'\n\n'}Big APPetite is not liable or responsible for any issues
          relating to the Products, including with respect to manufacturing,
          sale, purchase, storage, preparation, production, processing, marking,
          delivery, quality, ingredients, allergens or handling of the Products.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}6. Receiving Products
        </Text>
        <Text>
          {'\n\n'}A list of Products can be found in the app. The supply of
          Products on the Platform is only an invitation to the Customer to
          receive Products, subject to availability and continued consent of the
          Advertiser. [An advertisement created by an Advertiser is not
          considered an obligation. Advertisers may rescind their offer to any
          User, at any time, for any reason.]
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}7. Reporting Product adverts
        </Text>
        <Text>
          {'\n\n'}In case of any issues regarding adverts, Customers and
          Advertisers may submit issues via the Platform’s reporting feature or
          to{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            bigappetitesd@gmail.com.
          </Text>{' '}
          Issues will be handled as Big APPetite deems correct and any decision
          to block or suspend accounts and/or remove Product adverts is entirely
          up to Big APPetite.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}8. Customer adverts
        </Text>
        <Text>
          {'\n\n'}In particular (but without limitation), any adverts that the
          Customer submits through the Platform may not:
          {'\n\n'}- contain any defamatory, obscene or offensive material;
          {'\n'}- promote violence or discrimination;
          {'\n'}- infringe the intellectual property rights of another person or
          legal entity;
          {'\n'}- breach any legal duty owed to a third party (such as a duty of
          confidence);
          {'\n'}- promote illegal activity or invade another’s privacy;
          {'\n'}- give the impression that they originate from us; or
          {'\n'}- be used to impersonate another person or to misrepresent your
          affiliation with another person.
          {'\n\n'}Big APPetite is entitled to remove or edit at any time any
          adverts posted, uploaded or transmitted to the Platform in the event
          that the advert breaches one or more of the prohibitions mentioned
          above or is otherwise deemed inappropriate.
          {'\n\n'}The adverts contained on the Platform are for information
          purposes only and do not constitute advice from Big APPetite. Adverts
          reflect the opinions of Advertisers who are offering Products through
          the Platform, and any statements, advice or opinions provided by such
          persons are theirs only. Accordingly, to the fullest extent permitted
          by law, Big APPetite assume no responsibility or liability to any
          person for any adverts, including without limitation any mistakes,
          defamation, obscenity, omissions or falsehoods that the Customer may
          encounter in any such adverts.
          {'\n\n'}Big APPetite is entitled to store the adverts.
          {'\n\n'}The Customer will not receive compensation or benefits from
          making adverts through the Platform.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}9. Customer behavior
        </Text>
        <Text>
          {'\n\n'}Customers are requested to show respect for the Advertisers,
          as well as Big APPetite’s personnel.
          {'\n\n'}The Customer is informed that in case of inappropriate
          behavior towards the Advertiser, other Customers or Big APPetite, or
          if the Customer in connection with the Service, or any other similar
          behavior, Big APPetite may ban, exclude or suspend the Customer from
          the Platform and the Services.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}10. Intellectual Property
        </Text>
        <Text>
          {'\n\n'}The Customer may use the Platform and print and download
          extracts from the Platform for their personal non-commercial use on
          the following basis:
          {'\n\n'}- The Customer must not misuse the Platform (including hacking
          or “scraping”).
          {'\n'}- Unless otherwise stated, the copyright and other intellectual
          property rights in the Platform and in material published on it
          (including without limitation photographs and graphical images) are
          owned by Big APPetite or Big APPetite’s licensors. These works are
          protected by copyright laws and treaties around the world and all
          rights are reserved. For the purposes of these Terms, any use of
          extracts from the Platform other than in accordance with this clause
          16 is prohibited.
          {'\n\n'}Except as stated in this clause16, the Platform may not be
          used, and no part of the Platform may be reproduced or stored in any
          other Platform or included in any public or private electronic
          retrieval system or service, without Big APPetite’s prior written
          permission.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}11. Governing law
        </Text>
        <Text>
          {'\n\n'}These Terms are subject to UK laws.
          {'\n\n'}Any dispute arising out of or in connection with these Terms
          shall – where such dispute cannot be settled amicably – be decided by
          the UK courts.
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>
          {'\n\n'}Privacy Policy
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}Introduction
        </Text>
        <Text>
          {'\n\n'}Big APPetite works to ensure that your privacy is protected
          when using our Services. We therefore have a policy setting out how
          your Personal Data will be processed and protected. Please stay
          updated on any changes to this Privacy Policy by viewing the relevant
          document on our mobile application (“Platform”).
          {'\n\n'}This Privacy Policy only concerns Big APPetite’s Customers and
          users of our Platform and Services.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}What information do we collect?
        </Text>
        <Text>
          {'\n\n'}Big APPetite collects information to operate our Platform and
          provide you with opportunities for reducing food waste. We collect
          both Personal Data and Other Information in support of these efforts.
          {'\n\n'}- "Personal Data" is information that can be used, directly or
          indirectly, alone or together with other information, to identify you
          as an individual Customer. This may include your precise Location
          Data.
          {'\n'}- "Other Information" is information that is anonymous,
          aggregate, de-identified, or otherwise does not reveal your identity.
          Some examples include age, gender, browser and operating system, time
          spent using our Services, and webpages visited. We collect and use
          this information to understand how you and our Customers as a whole
          use our Services and constantly tune, enhance, innovate and build
          products and services to reflect the needs of our Customers. When you
          are using a mobile device, we also collect and use your Apple
          Identifier for Advertising (IDFA) and Google Advertising ID (AAID) to
          recognize your device and support activities on our Services. These
          number values are not permanently tied to your device and, depending
          on your operating system, you can reset it through your device
          settings.
          {'\n\n'}We collect Personal Data in the following ways:
          {'\n\n'}1. When you register with us, we collect registration and
          demographic details, e.g., name, email address, password.
          {'\n\n'}We process this Personal Data because it is necessary for
          performing the agreement with you for the use of the Platform,
          pursuant to GDPR article 6 (1) (b).
          {'\n\n'}We process this Personal Data based on your consent, pursuant
          to GDPR article 6 (1) (a).
          {'\n\n'}Other Information: We may collect Other Information about your
          use of our Services. This includes, for example, your device type,
          carrier provider, browser type, operating system, internet domain and
          host name, date and time of access as well as referring and onward
          URL, as well as transactional data about the activities you undertake
          and how you interact with the Services, such as what data is
          displayed, clicked on or shared, the click stream patterns, and the
          length of time spent on each site or page; and searches you may
          conduct on the Services.
          {'\n\n'}We process this Personal Data because it is necessary for the
          purposes of the legitimate interests pursued by us in order to improve
          our Platform, pursuant to GDPR article 6 (1) (f).
          {'\n\n'}When we collect Personal Data directly from you, you
          voluntarily provide us with the Personal Data in order to use the
          Platform.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}How do we use your Personal Data?
        </Text>
        <Text>
          {'\n\n'}We use the data we collect to operate our business, advertise
          and improve our existing Platform, develop new services and to improve
          and personalize your experiences interacting with us. We also use your
          Personal Data to communicate with you.
          {'\n\n'}We will use your Personal Data for the following purposes:
          {'\n\n'}1. Operate our business and run our Services.
          {'\n\n'}We use your Personal Data to create and manage your personal
          account at Big APPetite and to process your adverts.
          {'\n\n'}2. Personalize experiences on our Services, better understand
          our Customers and gain customer insights
          {'\n\n'}We use your Personal Data to conduct analyses in order to
          provide you with relevant functionality. This includes showing you a
          map or list view of nearby products and suggesting the most relevant
          products for you.
          {'\n\n'}3. Communicate with you and respond to your requests
          {'\n\n'}When registering an account with us, you have a choice of
          receiving announcements about posts via push notifications. If you
          consent to such messages, we may notify you about new posts. You can
          manage your communication preferences at any time from the mobile
          applications.
          {'\n\n'}We may use your Personal Data to respond to your requests for
          technical support or to any other communication you initiate. This
          includes accessing your account to address technical support requests.
          {'\n\n'}Please note that irrespective of your email and push
          notifications settings, we may send you notifications pertaining to
          the performance of our Services, such as revision of our Terms or this
          Privacy Policy or other formal communications relating to the
          Platform.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}Where is your Personal Data stored?
        </Text>
        <Text>
          {'\n\n'}The data that we collect from you is stored on Google’s
          Firebase service.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}For how long is your Personal Data stored?
        </Text>
        <Text>
          {'\n\n'}Big APPetite will retain your Personal Data for as long as you
          maintain an Account or as needed to provide you the Services.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}Who is responsible for your Personal Data?
        </Text>
        <Text>
          {'\n\n'}Big APPetite is the controller of the Personal Data you submit
          to us and responsible for your Personal Data under GDPR.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}Who has access to your Personal Data
        </Text>
        <Text>
          {'\n\n'}Your data may be shared within the Big APPetite group. We
          never pass on, sell or swap your data for marketing purposes to third
          parties outside the Big APPetite group
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}How do we protect your Personal Data?
        </Text>
        <Text>
          {'\n\n'}We have taken technical and organisational measures to protect
          your data from loss, manipulation and unauthorised access. We
          continually adapt our security measures in line with technological
          progress and developments.
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}What are your rights?
        </Text>
        <Text>
          {'\n\n'}You have the right to request information about the Personal
          Data we hold on you at any time. If your Personal Data is incorrect,
          incomplete or irrelevant, you can ask to have the information
          corrected or removed. You also have the right to request the
          processing of your Personal Data restricted and in some circumstances
          to data portability. We cannot remove your Personal Data when there is
          a legal storage requirement. You can withdraw your consent to us using
          the Personal Data for marketing purposes at any time. You can contact
          us either by sending an email to{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            bigappetitesd@gmail.com
          </Text>
          . Your rights under the Data Protection Act will not be affected.
          {'\n\n'}You may file a complaint with the UK Information
          Commissioner’s Office if you are dissatisfied with our processing of
          your Personal Data. You can find the contact details of the Danish
          Data Protection Agency on{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            https://ico.org.uk/
          </Text>
          .
        </Text>
        <Text style={{textDecorationLine: 'underline'}}>
          {'\n\n'}Controller of Personal Data
        </Text>
        <Text>
          {'\n\n'}Big APPetite
          {'\n\n'}E-Mail:{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            bigappetitesd@gmail.com
          </Text>
        </Text>
        <Text>{'\n\n'}</Text>
      </Text>
    </ScrollView>
  );
}
