import React from "react";
import styled from "styled-components";
export default function Header() {
  return (
  <StyledDiv>
    <div className="mt-0 pt-0 mb-4">
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-control="navbar"
            aria-expand="false"
            aria-lable="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav mx-auto mb-lg-0">
              <li className="nav-item mx-2">
                <a href="https://test.doaguru.com/jss/" className="nav-link text-light">
                  <i class="bi bi-house-door-fill"></i>
                </a>
              </li>
              <li className="nav-item dropdown mx-2">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-light"
                  data-bs-toggle="dropdown"
                >
                  About Us
                </a>
                <ul className="dropdown-menu bg-primary">
                  <li>
                    <a href="https://test.doaguru.com/jss/wp-content/uploads/2023/08/MandatoryInfo-jsss.pdf" className="dropdown-item text-light">
                      Mandatory Information
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/meet-our-founder-manager/ " className="dropdown-item text-light">
                      Meet Our Founder & Manager
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/our-school/" className="dropdown-item text-light">
                      Our School
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/our-vision-and-mission-copy/" className="dropdown-item text-light">
                      Our School Magazine
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/our-vision-and-mission/" className="dropdown-item text-light">
                      Our Vision And Mission
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown mx-2">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-light"
                  data-bs-toggle="dropdown"
                >
                  Fees
                </a>
                <ul className="dropdown-menu bg-primary">
                  <li>
                    <a href="https://test.doaguru.com/jss/wp-content/uploads/2023/08/Fee-instructions-2023-24-1.pdf" className="dropdown-item text-light">
                      Fees Payment 2023-2024
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/wp-content/uploads/2023/08/Fee-Structure-2023-24-b9.pdf" className="dropdown-item text-light ">
                      Fees Structure 2023-2024
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown mx-2">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-light"
                  data-bs-toggle="dropdown"
                >
                  School App Link
                </a>
                <ul className="dropdown-menu bg-primary">
                  <li>
                    <a href="https://play.google.com/store/apps/details?id=com.db.nascorp.jsss" className="dropdown-item text-light">
                      For Android Mobile
                    </a>
                  </li>
                  <li>
                    <a href="https://apps.apple.com/in/app/joy-sr-sec-school-jabalpur/id1618084721" className="dropdown-item text-light">
                      For IOS Mobile
                    </a>
                  </li>
                  <li>
                    <a href="https://jsss.nascorptechnologies.com/Index" className="dropdown-item text-light">
                      For Web Browser
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown mx-2">
                <a href="#" className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown">
                  Happening
                </a>
                <ul className="dropdown-menu bg-primary">
                  <li>
                    <a href="https://test.doaguru.com/jss/school-annual-calendar-2/" className="dropdown-item text-light">
                      Annual School Calender
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/events/" className="dropdown-item text-light">
                     Events
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/shop/" className="dropdown-item text-light">
                      Image Gallery
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/sports-2/" className="dropdown-item text-light">
                      Sports Gallery
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/our-magazine-copy-3/" className="dropdown-item text-light">
                      Summer Camp
                    </a>
                  </li>
                  {/* <li>
                    <a href="https://test.doaguru.com/jss/photo-gallery/" className="dropdown-item text-light">
                      Photo Gallery
                    </a>
                  </li> */}
                  <li>
                    <a href="https://test.doaguru.com/jss/media-corner-2/" className="dropdown-item text-light">
                      Media Corner
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/our-magazine-copy-2/" className="dropdown-item text-light">
                      Yoga Day
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item mx-2">
                <a href="https://test.doaguru.com/jss/Jsss/eregistration.php" className="nav-link text-light">
                  E-Registeration
                </a>
              </li>
              {/* <li className="nav-item mx-2">
                <a href="#" className="nav-link text-light">
                  Latest Events
                </a>
              </li> */}
              <li className="nav-item dropdown mx-2">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-light"
                  data-bs-toggle="dropdown"
                >
                  Student Corner
                </a>
                <ul className="dropdown-menu bg-primary">
                  <li>
                    <a href="https://test.doaguru.com/jss/appointment-with-heads/" className="dropdown-item text-light">
                      Appointment with Heads
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/awards-achievements-2/" className="dropdown-item text-light">
                      Awards & Achievements
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/petayu/html/index.html" className="dropdown-item text-light">
                      Birthday Corner
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/examination-pattern-2/" className="dropdown-item text-light">
                      Examination Pattern
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/Jsss/downloads.php" className="dropdown-item text-light">
                      Download Reports & Cards
                    </a>
                  </li>
                  <li>
                    <a href="https://test.doaguru.com/jss/our-uniform/" className="dropdown-item text-light">
                       Our School Uniform
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item mx-2">
                <a href="/" className="nav-link text-light">
                  Photo-Gallery
                </a>
              </li>
              <li className="nav-item mx-2">
                <a href="https://test.doaguru.com/jss/contactus/" className="nav-link text-light">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </StyledDiv>
  );
}

const StyledDiv = styled.div
`
.dropdown-menu a:hover {
    background-color: #0d6efd; 
    color: white; 
}

`;



// import React from 'react';
// import styled from 'styled-components';

// function Header() {
//   const schoolAddress = 'Plot No. A, JDA Scheme No. 5/14, Vijay Nagar, Jabalpur, Madhya Pradesh, 482002';
//   const googleMapsLink = `https://www.google.com/maps/place/Joy+Senior+Secondary+School/@23.1894375,79.9053347,17z/data=!3m1!4b1!4m6!3m5!1s0x3981b1d01fd1853f:0x302935eaf5380ee4!8m2!3d23.1894326!4d79.9079096!16s%2Fm%2F080lzmr?authuser=0&entry=ttu`;
//   return (
//     <Wrapper>
//       <table cellpadding="0" cellspacing="0" border="0" width="100%" align="center">
//       <tr>
//         <td style={{ background: 'linear-gradient(#2c4a6e, #4d7db7)', padding: '10px' }}>
//           <table cellpadding="0" cellspacing="0" border="0" width="100%" align="center">
//             <tr valign="top">
//               <td width="20%" align="center">
//                 <img
//                   src="https://res.cloudinary.com/antrix/image/upload/v1690366105/jsslogo-png_neij4r.png"
//                   style={{ height: '170px' }}
//                   alt="School Logo"
//                 />
//               </td>
//               <td width="60%" className="cn clr-wh" style={{ lineHeight: '2em' }}>
//                 <span className="org">Joy Senior Secondary School</span><br />
//                 <span className="data"><a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="data text-decoration-none text-light">
//                 Plot No. A, JDA Scheme No. 5/14, Vijay Nagar, Jabalpur (M. P.) 482002
//                 </a></span><br />
//                 <span className="ftmd b"><u>Student Gallery</u></span><br />
//                 <span className="ftmd b">SESSION : 2024-25</span>
//               </td>
//               <td width="20%">&nbsp;</td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//     </Wrapper>
//   );
// }

// export default Header;

// const Wrapper = styled.div`
// @media print {
//   .page-break {
//     display: block;
//     page-break-before: always;
//   }
//   .bottons {
//     display: none;
//   }
// }
// @page {
//   size: A4, Portrait;
//   margin: 30px 10px;
// }
// .data {
//   font-size: 15px;
//   padding-bottom: 10px;
// }
// .b {
//   font-weight: bold;
// }
// .org {
//   text-transform: uppercase;
//   font-size: 24px;
//   text-align: center;
//   font-family: Times New Roman;
//   font-weight: bold;
// }
// .cn {
//   text-align: center;
// }

// .und {
//   text-decoration: underline;
// }
// .ftmd {
//   font-size: 18px;
// }
// .clr-wh {
//   color: white;
// }
// `;
// // import React from 'react'

// // export default function Header() {
// //   return (
// //     <div>Header</div>
// //   )
// // }
