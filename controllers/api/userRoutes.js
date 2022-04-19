const router = require('express').Router();
const { User} = require('../../models');





//verify that name is unique
router.get('/check/:id', async(req,res)=>{

    try{
        const Aname = await User.findOne({ where: { name: req.params.id }});
        if(!Aname) {
            res.status(200).json({ message: 'new name' });
            return;
        }
        else {
            res.status(298).json({ message: 'used name' });
            return;
        }
    }catch(err){
        res.status(500).json({ message: 'Oh no' });
        console.log(err);
        return;
        
    }

});


//signup 
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        
        req.session.save(() => {
            //register session (login)
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login 
router.post('/login', async (req, res) => {
    try {
        if (!req.body.name||!req.body.password) {
            res.status(400).json({message: 'Something went wrong'})
            return;
        }

        const userData = await User.findOne({ where: { name: req.body.name } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username. Please try again.' });
            return;

        }else{
            const validPassword = userData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password. Please try again.' });
                return;
            }
        }

        req.session.save(() => {
            //register session
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Yay' });
        });

    } catch (err) {
        res.status(400).json({error: err, message: 'Oops'});
        console.log(err);
    }
});

//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        //close session
        req.session.destroy(() => {
            res.status(204).end();//only return status
        });
    } else {
        res.status(404).end();//only return status
    }
});

module.exports = router;

