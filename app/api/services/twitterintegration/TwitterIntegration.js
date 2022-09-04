"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TwitterIntegration = void 0;var _TaskManager = require("../tasksmanager/TaskManager");
var _tenants = require("../../tenants");
var _settings = _interopRequireDefault(require("../../settings/settings"));
var _entities = _interopRequireDefault(require("../../entities/entities"));
var _templates = _interopRequireDefault(require("../../templates"));
var _relationtypes = _interopRequireDefault(require("../../relationtypes"));
var _getTwitterImages = require("./getTwitterImages");





var _permissionsContext = require("../../permissions/permissionsContext");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






















class TwitterIntegration {




  constructor() {_defineProperty(this, "twitterTaskManager", void 0);_defineProperty(this, "getTwitterIntegrationSettings",










    async () => {
      const settingsValues = await _settings.default.get({}, 'features');
      if (!settingsValues.features || !settingsValues.features.twitterIntegration) {
        return {
          searchQueries: [],
          hashtagsTemplateName: '',
          tweetsTemplateName: '',
          language: '',
          tweetsLanguages: [] };

      }

      return settingsValues.features.twitterIntegration;
    });_defineProperty(this, "addTweetsRequestsToQueue",

    async () => {
      const pendingTasks = await this.twitterTaskManager.countPendingTasks();
      if (pendingTasks > 0) {
        return;
      }

      await Promise.all(
      Object.keys(_tenants.tenants.tenants).map(async (tenant) => {
        await _tenants.tenants.run(async () => {
          const twitterIntegration = await this.getTwitterIntegrationSettings();

          if (!twitterIntegration.hashtagsTemplateName) {
            return;
          }

          await this.getTemplateTweets(twitterIntegration);

          // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-restricted-syntax
          for (const hashtag of twitterIntegration.searchQueries) {
            // eslint-disable-next-line no-await-in-loop
            await this.twitterTaskManager.startTask({
              task: 'get-hashtag',
              tenant,
              params: {
                query: hashtag,
                tweets_languages:
                twitterIntegration && twitterIntegration.tweetsLanguages ?
                twitterIntegration.tweetsLanguages :
                [] } });


          }
        }, tenant);
      }));

    });_defineProperty(this, "processResults",

    async (message) => {
      await _tenants.tenants.run(async () => {var _message$params, _message$params2, _message$params3, _message$params4, _message$params5, _message$params6;
        _permissionsContext.permissionsContext.setCommandContext();
        const twitterIntegration = await this.getTwitterIntegrationSettings();

        if (!twitterIntegration.hashtagsTemplateName) {
          return;
        }

        const templateTweet = await this.getTemplateTweets(twitterIntegration);
        const tweetHashtags = await this.saveHashtags(twitterIntegration, (_message$params = message.params) === null || _message$params === void 0 ? void 0 : _message$params.hashtags);

        const twitterImagesData = (0, _getTwitterImages.getTwitterImagesData)(message);
        const textWithAttachedImages = (0, _getTwitterImages.getTextWithAttachedImages)(message, twitterImagesData);
        const entity = await _entities.default.save(
        {
          title: (_message$params2 = message.params) === null || _message$params2 === void 0 ? void 0 : _message$params2.title,
          metadata: {
            tweet_text: [{ value: textWithAttachedImages }],
            tweet_source: [{ value: { label: 'link', url: (_message$params3 = message.params) === null || _message$params3 === void 0 ? void 0 : _message$params3.source } }],
            tweet_author: [
            {
              value: { label: (_message$params4 = message.params) === null || _message$params4 === void 0 ? void 0 : _message$params4.user.display_name, url: (_message$params5 = message.params) === null || _message$params5 === void 0 ? void 0 : _message$params5.user.url } }],


            tweet_date: [{ value: (_message$params6 = message.params) === null || _message$params6 === void 0 ? void 0 : _message$params6.created_at }],
            tweet_hashtags: tweetHashtags },

          template: templateTweet._id },

        { user: {}, language: twitterIntegration === null || twitterIntegration === void 0 ? void 0 : twitterIntegration.language });


        await (0, _getTwitterImages.getTwitterImages)(entity, twitterImagesData);
      }, message.tenant);
    });_defineProperty(this, "saveHashtags",

    async (
    twitterIntegration,
    hashtags) =>
    {
      const templateHashtag = await this.getHashtagsTemplate(twitterIntegration);

      const tweetHashtags = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const hashtag of hashtags) {
        // eslint-disable-next-line no-await-in-loop
        const hashtagEntities = await _entities.default.getUnrestricted({
          title: hashtag.toString(),
          template: templateHashtag._id });


        if (hashtagEntities.length) {
          tweetHashtags.push({
            value: hashtagEntities[0].sharedId,
            type: 'entity',
            icon: null });

        } else {
          // eslint-disable-next-line no-await-in-loop
          const savedEntity = await _entities.default.save(
          {
            title: hashtag.toString(),
            template: templateHashtag._id },

          { user: {}, language: twitterIntegration.language });

          tweetHashtags.push({
            value: savedEntity.sharedId,
            type: 'entity',
            icon: null });

        }
      }
      return tweetHashtags;
    });_defineProperty(this, "getTemplateTweets",

    async (twitterIntegration) => {
      const templatesTweet = await _templates.default.get({ name: twitterIntegration.tweetsTemplateName });

      if (templatesTweet.length) {
        return templatesTweet[0];
      }

      const hashtagsTemplate = await this.getHashtagsTemplate(twitterIntegration);

      const relationsType = await _relationtypes.default.get({ name: 'Twitter query' });

      const relationType = relationsType.length ?
      relationsType[0] :
      await _relationtypes.default.save({ name: 'Twitter query' });

      return _templates.default.save(
      {
        name: twitterIntegration.tweetsTemplateName,
        commonProperties: [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'creationDate', label: 'Date added', type: 'date' },
        { name: 'editDate', label: 'Date modified', type: 'date' }],

        properties: [
        { name: 'tweet_text', label: 'Tweet text', type: 'markdown', showInCard: true },
        { name: 'tweet_source', label: 'Tweet source', type: 'link', showInCard: true },
        { name: 'tweet_author', label: 'Tweet author', type: 'link', showInCard: true },
        { name: 'tweet_date', label: 'Tweet date', type: 'date' },
        {
          name: 'tweet_hashtags',
          label: 'Tweet hashtags',
          type: 'relationship',
          relationType: relationType._id.toString(),
          content: hashtagsTemplate._id.toString(),
          filter: true }] },



      twitterIntegration.language);

    });_defineProperty(this, "getHashtagsTemplate",

    async (twitterIntegration) => {
      const templatesHashtag = await _templates.default.get({
        name: twitterIntegration.hashtagsTemplateName });


      return templatesHashtag.length ?
      templatesHashtag[0] :
      _templates.default.save(
      {
        name: twitterIntegration.hashtagsTemplateName,
        commonProperties: [{ name: 'title', label: 'Title', type: 'text' }] },

      twitterIntegration.language);

    });this.twitterTaskManager = new _TaskManager.TaskManager({ serviceName: TwitterIntegration.SERVICE_NAME, processResults: this.processResults });}start() {this.twitterTaskManager.subscribeToResults();}}exports.TwitterIntegration = TwitterIntegration;_defineProperty(TwitterIntegration, "SERVICE_NAME", 'twitter_crawler');