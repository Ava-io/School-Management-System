export const generatePassword = (schoolName) => {
  const alph = "abcdefghijklmnopqrstuvwxyz0123456789?@*~!()-_$#^&+";
  let password = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * alph.length);
    password += alph[randomIndex];
  }

  const schoolPart = schoolName.slice(0, 3).toLowerCase();

  return schoolPart + password;

  // Math.random() 0.65 * 24
  floor = 1;
};
