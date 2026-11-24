// Setup React + htm (dipakai semua file lain)
const { useState, useEffect, useRef } = React;
const html = htm.bind(React.createElement);

// Data profil untuk sidebar dan Hero. Ubah di sini.
const PROFILE = {
  first: "Joi",
  name: "Joi Diego Napitupulu",
  location: "Jakarta, Indonesia",
  openToWork: true, // false = sembunyikan lencana "Open to work"
  verified: true, // false = sembunyikan centang biru di samping nama
  resume: "assets/resume.pdf", // kosongkan ("") untuk menyembunyikan tombol Resume
};
