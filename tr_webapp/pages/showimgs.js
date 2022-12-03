import styles from '../styles/projects/MotionDetector.module.css';


function ShowImage({ data }) {
    // Render into HTML
        if ( data == null ) {
            return (
                <div className={styles.container}>
                    <h1>NO IMAGE DETECTED.</h1>
                    <h1>LET THE PYTHON SCRIPT TO RUN AND REFRESH THE PAGE.</h1>
                </div>
            )
        }

        return (
            <div>
                {data.imgData.map(function(imgData) {
                    // Get the image data
                    let image = imgData['img']['data'];
    
                    // Convert into blob into string with charset=utf-8
                    let base64Image = Buffer.from(image, 'base64').toString('utf-8');
    
                    // Configure the image tag attribute (src)
                    let imgSrc = "data:image/png;base64," + base64Image;
                    
                    // Get the date time
                    let dt = imgData['date_time'];
                    
                    return (
                        <div className={styles.container}>
                            <p>DateTime Taken: {dt}</p>
                            <img src={imgSrc}/>
                        </div>
                    )
                })}   
            </div>     
        )
    
}

export async function getServerSideProps() {
    // Fetch data from the server
    const res = await fetch('http://localhost:4000/show-images');

    // Get the json response
    const data = await res.json();

    return { props: { data } }
}

export default ShowImage