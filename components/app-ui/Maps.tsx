export default function GoogleMaps() {
    return (
        <div className="w-full h-[200px]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d63433.95315162297!2d7.466259694877366!3d6.442550448375306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sdentist%20near%20Enugu%20Enugu%20North%2C%20Enugu!5e0!3m2!1sen!2sng!4v1741342766156!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
