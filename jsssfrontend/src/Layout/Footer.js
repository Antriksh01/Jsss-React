import React from "react";
import styled from "styled-components";

function Footer() {
  const schoolName = "Joy Senior Secondary School";
  const addressLine1 = "Plot No. A, JDA Scheme No. 5/14,";
  const addressLine2 = "Vijay Nagar";
  const city = "Jabalpur";
  const postalCode = "482002";
  const state = "M.P.";
  const emailAddress = "jssschool@gmail.com";
  const contact1 = "+ 91 7614055260";
  const contact2 = "+91 7489921050";
  const contact3 = "0761-4055270";

  const googleMapsUrl = `https://www.google.com/maps?q=${schoolName},${addressLine1},${addressLine2},${city}-${postalCode},${state}`;
  return (
    <>
      <StyledDiv>
        <div className="Footer  mt-5">
          <div className="container-fluid mx-lg-5">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-12 ft-1 ps-md-4">
                <h3 className="fhead">
                  <span className="yspan">
                    [
                  </span>
                  Contact information
                  <span className="yspan">
                    ]
                  </span>
                </h3>
                <div>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <p className="text-start text-dark fw-semibold">
                    <span className="yspan">&gt;</span> {schoolName}
                  </p>
                  <p className="text-start text-dark fw-semibold">
                    {addressLine1}
                  </p>
                  <p className="text-start text-dark fw-semibold">
                    {addressLine2} {city}-{postalCode}({state})
                  </p>
                  </a>
                </div>
                <p className="text-start text-dark fw-semibold">
                  <span className="yspan">
                    &gt;
                  </span>
                  &nbsp;
                  <a href={`tel:${contact1}`} style={{textDecoration:"none", color:"black", paddingLeft:"0.5rem"}}>{contact1}</a><br/>
                  <a href={`tel:${contact2}`} style={{textDecoration:"none", color:"black", paddingLeft:"1.6rem"}}>{contact2}</a><br/>
                  <a href={`tel:${contact3}`} style={{textDecoration:"none", color:"black", paddingLeft:"1.6rem"}}>{contact3}</a>
                </p>
                <p className="text-start text-dark fw-semibold">
                  <span className="yspan">
                    &gt;
                  </span>
                  &nbsp; 
                  <a href={`mailto:${emailAddress}`} style={{textDecoration:"none", color:"black"}}>{emailAddress}</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-3 col-12 ft-2 ps-md-5">
                <h3 className="fhead">
                  <span className="yspan">
                    [
                  </span>
                  Quick Links
                  <span className="yspan">
                    ]
                  </span>
                </h3>
                <ul
                  className="ps-0"
                  style={{
                    listStyle: "none",
                  }}>
                  <li className="nav-item py-2 py-2">
                    <span className="yspan">
                      &gt;
                    </span>
                    &nbsp;
                    <a
                      className="text-decoration-none text-dark fw-semibold"
                      href="https://test.doaguru.com/jss/school-annual-calendar-2/">
                      Annual School
                      Calender
                    </a>
                  </li>
                  <li className="nav-item py-2">
                    <span className="yspan">
                      &gt;
                    </span>
                    &nbsp;
                    <a
                      className="text-decoration-none text-dark fw-semibold"
                      href="https://test.doaguru.com/jss/our-vision-and-mission-copy/">
                      Our School
                      Magazine
                    </a>
                  </li>
                  <li className="nav-item py-2">
                    <span className="yspan">
                      &gt;
                    </span>
                    &nbsp;
                    <a
                      className="text-decoration-none text-dark fw-semibold"
                      href="https://test.doaguru.com/petayu/html/index.html">
                      Birthday Corner
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-lg-3 col-12 ft-3 ps-md-5">
                <h3 className="fhead">
                  <span className="yspan">
                    [
                  </span>
                  Other Info
                  <span className="yspan">
                    ]
                  </span>
                </h3>
                <ul
                  className="ps-0"
                  style={{
                    listStyle: "none",
                  }}>
                  <li className="nav-item py-2">
                    <span className="yspan">
                      &gt;
                    </span>
                    &nbsp;
                    <a
                      className="text-decoration-none text-dark fw-semibold"
                      href="https://test.doaguru.com/jss/Jsss/eregistration.php">
                      e-Registeration
                    </a>
                  </li>
                  <li className="nav-item py-2">
                    <span className="yspan">
                      &gt;
                    </span>
                    &nbsp;
                    <a
                      className="text-decoration-none text-dark fw-semibold"
                      href="https://test.doaguru.com/jss/wp-content/uploads/2023/08/Fee-instructions-2023-24-1.pdf">
                      Fees Payment
                    </a>
                  </li>
                  <li className="nav-item py-2">
                    <span className="yspan">
                      &gt;
                    </span>
                    &nbsp;
                    <a
                      className="text-decoration-none text-dark fw-semibold"
                      href="https://test.doaguru.com/jss/wp-content/uploads/2023/08/Fee-Structure-2023-24-b9.pdf">
                      Fees Structure
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-lg-3 col-12 ft-0">
                <h3 className="fhead">
                  <span className="yspan">
                    [
                  </span>
                  Social Media
                  <span className="yspan">
                    ]
                  </span>
                </h3>
                <a
                  className="btn btn-floating m-1 "
                  href="https://www.youtube.com/channel/UCGoIrhnYvJdI4vpf7g6AfLw"
                  role="button">
                  <i class="bi bi-youtube"></i>
                </a>
                <a
                  className="btn btn-floating m-1"
                  href="https://www.facebook.com/JoyGroupofSchool/"
                  role="button">
                  <i class="bi bi-facebook"></i>
                </a>
                <a
                  className="btn btn-floating m-1"
                  href="https://www.instagram.com/joy_group_of_schools/"
                  role="button">
                  <i class="bi bi-instagram"></i>
                </a>
                <a
                  className="btn btn-floating m-1"
                  href="https://www.linkedin.com/in/joy-senior-secondary-school-33a89b286/"
                  role="button">
                  <i class="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </StyledDiv>
    </>
  );
}

export default Footer;
const StyledDiv = styled.div`
  .Footer {
    background-color: #eee;
    padding: 2rem 0;
  }
  .ft-1 h3 {
    font-weight: 800;
    font-family: Georgia,
      "Times New Roman", Times, serif;
    color: black;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 1em;
  }
  .ft-2 h3 {
    font-weight: 800;
    font-family: Georgia,
      "Times New Roman", Times, serif;
    color: black;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 1em;
  }
  .ft-3 h3 {
    font-weight: 800;
    font-family: Georgia,
      "Times New Roman", Times, serif;
    color: black;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 1em;
  }
  .ft-0 h3 {
    font-weight: 800;
    font-family: Georgia,
      "Times New Roman", Times, serif;
    color: black;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 1em;
  }

  .ft-0 a i {
    color: black;
    font-size: 1.5rem;
  }
  .ft-0 a i:hover {
    color: #feab00;
  }
  .yspan {
    color: #feab00;
    font-weight: bolder;
    font-size: large;
  }
  /* .fhead {
    color: black;
    font-family: "Nunito", Sans-serif;
    font-size: 1em;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 4px;
  } */
`;




// import React from 'react';
// import styled from 'styled-components';

// const Footer = () => {
//   return (
//     <FooterWrapper className="footer_area section_padding_130_0">
//       <div className="container">
//         <div className="row">
//           {/* Single Widget */}
//           <div className="col-12 col-sm-6 col-lg-4">
//             <div className="single-footer-widget section_padding_0_130">
//               {/* Footer Logo */}
//               <div className="footer-logo mb-3"></div>
//               <p>Appland is completely creative, lightweight, clean app landing page.</p>
//               {/* Copywrite Text */}
//               <div className="copywrite-text mb-5">
//                 <p className="mb-0">Made with <i className="lni-heart mr-1"></i>by<a className="ml-1" href="https://wrapbootstrap.com/user/DesigningWorld">Designing World</a></p>
//               </div>
//               {/* Footer Social Area */}
//               <div className="footer_social_area">
//                 <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i className="fa fa-facebook"></i></a>
//                 <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i className="fa fa-pinterest"></i></a>
//                 <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype"><i className="fa fa-skype"></i></a>
//                 <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a>
//               </div>
//             </div>
//           </div>
//           {/* Rest of your code */}
//         </div>
//       </div>
//     </FooterWrapper>
//   );
// };

// export default Footer;
// const FooterWrapper = styled.div`

// `;

// import React from 'react'

// export default function Footer() {
//   return (
//     <div>Footer</div>
//   )
// }
