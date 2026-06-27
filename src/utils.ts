export function getWhatsAppUrl(productOrServiceName: string): string {
  const phoneNumber = "917001055879";
  const message = `Hello QuickDrop Team 👋

I am interested in the following item:

**Product/Service:** ${productOrServiceName}

My Name:

---

Mobile Number:

---

Delivery Address:

---

Additional Requirements:

---

Please let me know the price, availability, and estimated delivery time.

Thank you.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export function handleWhatsAppClick(productOrServiceName: string) {
  const url = getWhatsAppUrl(productOrServiceName);
  window.open(url, "_blank", "noopener,noreferrer");
}

export function handleCallNowClick() {
  window.location.href = "tel:+917001055879";
}

export function scrollToContact() {
  const element = document.querySelector("#contact");
  if (element) {
    const offset = 80; // Navbar height offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}
