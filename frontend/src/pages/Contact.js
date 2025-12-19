import "../styles/Contact.css";
function Contact() {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <textarea placeholder="Message"></textarea>
      <button>Send</button>
    </div>
  );
}
export default Contact;
