import twitterLogo from "../../assets/images/twitter.svg"
import discordLogo from "../../assets/images/discord.svg"

function Footer() {
  return (
    <footer>
      <div className='socialsContainer'>
        <img className="twitterLogo" src={twitterLogo} alt="twitterLogo" />
        <img className="discordLogo" src={discordLogo} alt="discordLogo" />
      </div>
    </footer>
  );
}

export default Footer;
