const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new thought (POST)
  async createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const thought = new Thought({
        thoughtText,
        username
      });
      const newThought = await thought.save();
      user.thoughts.push(newThought._id);
      await user.save();
      res.status(201).json(newThought);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Updates a thought by its ID (PUT)
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes a thought by its ID (DELETE)
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      // Remove the thought from associated user's thoughts array
      const user = await User.findById(thought.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.thoughts = user.thoughts.filter(thoughtId => thoughtId.toString() !== req.params.id);
      await user.save();
      // Remove the thought itself
      await thought.remove();
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    const { reactionBody, username } = req.body;
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.push({ reactionBody, username });
      const updatedThought = await thought.save();
      res.status(201).json(updatedThought);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions = thought.reactions.filter(reaction => reaction.reactionId.toString() !== req.params.reactionId);
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
