import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import {currentPunctuation} from '../helpers/Punctuation.js'

class ContentPointsExplanation extends Content {
    constructor(){
        super(Steps.POINTS_EXPLANATION)

        // Scope
        const self = this

        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)
        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);

        this.scoreLabel = document.querySelector(`#step-${this.contentID} .score-points-total`)
        this.exaplanationTitleLabel = document.querySelector(`.punctuation-description`)
        this.exaplanationDescriptionLabel = document.querySelector(`.explanation-description`)

    }

    preactivateContent(){
        const punctuation = currentPunctuation.getPunctuation()

        let explanationTitle = ""
        let explanationDescription = ""
        if(punctuation >= 85 && punctuation <= 100){
            explanationTitle = "Environmental Awareness Advocate"
            explanationDescription = `Congrats on <strong>completing the game!</strong><br>You've secured the position of Sustainability Project Coordinator. Your participation and enthusiasm showcase your willingness to learn and grow. Every journey begins with a single step, and your dedication is a testament to your potential.<br><br>
            Join us and start your adventure at WHU where we value the drive to improve and will be here to nurture your skills and passion. <strong>Together</strong>, we'll pave the way for you to contribute meaningfully to the business world.`
            
        }else if(punctuation > 100 && punctuation <= 150){
            explanationTitle = "Green Startup Enthusiast"
            explanationDescription = `Your creative solutions and adaptability have marked you as a true innovator. You're well-positioned to explore opportunities in the realm of sustainable startups and environmental products.<br><br>
            Your journey doesn't end here – <strong>start your adventure at WHU</strong> where we will empower your creative thinking! Join us and let us guide you toward becoming a catalyst for meaningful change.`
            
        }else if(punctuation > 150 && punctuation <= 200){
            explanationTitle = "Sustainable Business Strategist"
            explanationDescription = `Very <strong>thoughtful responses!</strong><br>Your ability to manage complex challenges and make crucial decisions advocating for the environment demonstrates your exceptional strategical skills. You're on track to guide established companies toward a greener future!<br><br>
            Your journey doesn't end here – <strong>start your adventure at WHU</strong> where we will nurture and elevate your skills to even greater heights. <strong>Join us</strong> to unleash your full potential and become a transformative force in the business landscape.`
            
        }else if(punctuation > 200 && punctuation <= 215){
            explanationTitle = "Eco-Entrepreneur"
            explanationDescription = `You've achieved an <strong>exceptional score!</strong><br>Your insightful answers and strategic thinking have showcased your remarkable entrepreneurial power. Your vision, and determination to drive positive change in the business world is exactly what is needed to create a sustainable business that makes our world a better place.<br><br>
            Your journey doesn't end here – <strong>start your adventure at WHU</strong> where we will nurture and elevate your skills to even greater heights.<br><br><strong>Join us</strong> to unleash your full potential and create the next big thing with us!`
            
        }

        this.scoreLabel.innerHTML = currentPunctuation.getPunctuation()

        this.exaplanationTitleLabel.innerHTML = explanationTitle
        this.exaplanationDescriptionLabel.innerHTML = explanationDescription

        
    }

    onClickNext(){
        this.gotoNextStep()
    }
    
}

export default ContentPointsExplanation