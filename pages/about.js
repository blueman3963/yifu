import Layout from '../components/layout.js'
import Link from 'next/link';

const About = () => {
  return(
    <div>
        <style jsx>
        {`
          .wrapper {
            font-family: roc-grotesk, sans-serif;
            font-weight: 400;
            font-style: normal;

            padding: 4vw 4vw;
            font-size: 40px;
            width: 100vw;
            box-sizing: border-box;
            @media screen and (max-width: 900px) {
              padding: 100px 20px;
              font-size: 18px;
            }

            .first {
              width: 60%;
              max-width: 900px;
              padding-bottom: 0px;
              margin: auto;

              @media screen and (max-width: 900px) {
                width: 100%;
                padding-right: 0;
              }
            }
          }

          .back {
            position: fixed;
            left: 4vw;
            top: 4vw;
            font-family: roc-grotesk, sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 40px;
            background-color: #000;
            z-index: 999;
            a {
              color: inherit !important;
            }
          }

          .att {
            font-family: gimlet-display, serif;
            font-weight: 300;
            font-style: italic;
            margin-right: 5px;
          }

        `}
        </style>
        <div className='back'><Link href='/'><a>Back</a></Link></div>
        <div className='wrapper'>
          <div className='first'>
          <span className='att'>Yifu Zhang</span> is a freelance <span className='att'>Director/designer/developer</span> who keeps delivering <span className='att'>interesting experiences</span> to the world. He think Design is the process of shaping the way how a message been conveyed to others.
          <br/><br/>
          He is now based in NYC and working with clients mostly from the design and art field. Feel free to contact him at <a style={{color: '#fff'}} href='mailto:bluemanzhang@gmail.com?subject=Hello%20There!'>bluemanzhang@gmail.com</a> to grab a digital coffee.
          </div>
        </div>
    </div>
  );
}


export default About;
