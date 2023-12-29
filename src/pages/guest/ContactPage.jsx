import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";

function ContactPage() {
  return (
    <>
      <Header />
      <div className="backgroundImg">
        <h2>Contactez-nous</h2>
        <div className="outerContainer">
          <div className="innerContainer">
            <form className="formContainer">
              <label>
                Email
                <input type="text" name="email" />
              </label>
              <label for="encountered-problem">Problème(s) rencontré(s)</label>
              <select name="reason">
                <option value="">--Choisissez une option--</option>
                <option value="bug">J'ai rencontré un bug</option>
                <option value="report">J'aimerai signaler un comportement abusif</option>
                <option value="other">Autre</option>
              </select>
              <label>
                Décrivez votre problème
                <textarea className="labelDescribe" type="text" name="describeProblem" />
              </label>
              <button className="button1" type="submit">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
