// import { useState, createContext, useContext } from "react";
// import { MdOutlineLightMode } from "react-icons/md";
// import { MdOutlineDarkMode } from "react-icons/md";

// export const ThemeContext = createContext({
//     theme: "light",
//     handleThemeSwitch: () => {},
//     showDarkTheme: true,
// });

// export function ThemeContextProvider({ children }) {
//     const [showDarkTheme, setShowDarkTheme] = useState(true);
//     const [theme, setTheme] = useState("dark");
//     const handleThemeSwitch = () => {
//         console.log("switch clicked");
//         setShowDarkTheme((prev) => !prev);
//         setTheme(showDarkTheme ? "dark" : "light");
//     };
//     const themeContextValues = { theme, handleThemeSwitch, showDarkTheme };
//     return (
//         <ThemeContext.Provider value={themeContextValues}>
//             {/* <button
//                 id="theme-switch"
//                 onClick={handleThemeSwitch}
//                 className={theme}
//             >
//                 {showDarkTheme ? (
//                     <MdOutlineDarkMode className="icon" />
//                 ) : (
//                     <MdOutlineLightMode className="icon" />
//                 )}
//             </button> */}
//             {children}
//         </ThemeContext.Provider>
//     );
// }
// export const useTheme = () => {
//     return useContext(ThemeContext);
// };
