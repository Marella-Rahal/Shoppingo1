import React from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';
import './Homebody.css';
import background from '../../../Images/Background.jpg';
import Features from '../Features/Features';
import CustomersOpinion from '../CustomersOpinion/CustomersOpinion';
import Footer from '../Footer/Footer';

function Homebody(props) {

    const route=useNavigate();
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 300 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
      };


    return (
        <>
             <Navbar/>

             <div className="container-fluid h1-div-btn-margin">

                <img src={background} className="float-end background-img" alt="Background"/>

                <h1 style={{color:'#846703',textShadow:'2px 2px #222324'}}>
                    <span
                    class="txt-rotate"
                    data-period="1000"
                    data-rotate='[ "WELCOME TO SHOPPINGO" ]'></span>
                </h1>

                <p className="description">
                    Our website allows you to search the market from your home AND helps you control your monthly expenses and remind you of your bills
                </p>

                <button onClick={()=>{route("/LogIn")}} type="button" className="btn-mash">Start Make it Easy</button>

                
             </div>
             
             <Features />

             <CustomersOpinion/>

            <Footer/>
        </>
    );
}

export default Homebody;