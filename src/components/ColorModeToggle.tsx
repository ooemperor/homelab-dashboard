/**
 * File for the setting of the color mode toggler of the site
 * @author ooemperor
 */
import {useEffect, useState} from "react";

/**
 * Color toggle button that is used in the navbar with all its functionalities
 * @constructor
 */
export default function ColorModeToggle() {

    function loadMode() {
        var color_mode = localStorage.getItem('theme') || 'dark';
        console.log(color_mode);
        let element = document.getElementById("color-mode-toggle")
        if (color_mode == 'dark') {
                setIsChecked(true)
        }
        else {
                setIsChecked(false)
        }
        localStorage.setItem('theme', color_mode);
        setMode(color_mode);

    }


    // @ts-ignore
    const handleClick = event => {
        console.log(event.target.checked);
        let colormode;
        if (event.target.checked){
            colormode = "dark"
        }
        else {
            colormode = "light";
        }
        document.documentElement.setAttribute('data-bs-theme', colormode)
        localStorage.setItem('theme', colormode);
        setMode(colormode);
    }

    function setMode(color_mode: string) {
        document.documentElement.setAttribute('data-bs-theme', color_mode)
        localStorage.setItem('theme', color_mode);
        if (color_mode == 'dark'){
            setIsChecked(true)
        }
        else {
            setIsChecked(false)
        }

    }
    var color_mode = localStorage.getItem('theme') || 'dark';
    let isDark = false;
    if (color_mode !== 'dark') {
        isDark = true;
    }

    const [isChecked, setIsChecked] = useState(isDark);

    useEffect(() => {
        loadMode();
    }, []);

    return (
        <div>
            <div className="form-check form-switch">

                <input className="form-check-input" type="checkbox" role="switch" id="color-mode-toggle" defaultChecked={false} onClick={handleClick} checked={isChecked} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-moon-fill" viewBox="0 0 16 16">
                    <path
                        d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                </svg>
            </div>
        </div>
    )
}

