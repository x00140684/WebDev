// Site Navigation menu
// https://www.sitepoint.com/responsive-fluid-width-variable-item-navigation-css/
// https://www.w3schools.com/Css/css_navbar.asp

import Link from 'next/link';

const Nav = () => (
   <div>
       <nav>
           <ul>
            <li><Link href="/index"><a>Home</a></Link></li>
            <li><Link href="/business"><a>Business News</a></Link></li>
            <li><Link href="/sport"><a>Sport News</a></Link></li>
            <li><Link href="/music"><a>Music News</a></Link></li>
           </ul>

       </nav>
       {/* Define css for this page or component */}
       {/* Note back ticks `` surrounding css are required */}
       <style jsx>{`
      
    nav ul {
        list-style: none;
        background-color: #444;
        text-align: center;
        padding: 0;
        margin: 0;
        margin-bottom: 2em;
      } 
      nav li{
          padding-right: 5em;
      }
      nav a {
        text-decoration: none;
        color: #fff;
        display: block;
        transition: .3s background-color;
      }
       
      nav a:hover {
        background-color: #005f5f;
      }
       
      nav a.active {
        background-color: #fff;
        color: #444;
        cursor: default;
      }
  
      @media screen and (min-width: 600px) {
        
        nav li {
          width: 120px;
          border-bottom: none;
          height: 50px;
          line-height: 50px;
          font-size: 1em;
        }
       
        /* Option 1 - Display Inline */
        nav li {
          display: inline-block;
          margin-right: -4px;
        }
       

        `}</style>
   </div> 
)

export default Nav;

