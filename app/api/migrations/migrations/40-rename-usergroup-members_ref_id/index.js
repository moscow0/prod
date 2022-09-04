"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable no-await-in-loop */var _default =

{
  delta: 40,

  name: 'rename-usergroup-members_ref_id',

  description: 'rename user group member ref id',

  async up(db) {
    const cursor = await db.collection('usergroups').find({});

    while (await cursor.hasNext()) {
      const group = await cursor.next();
      const updatedMembers = group.members ?
      group.members.map((member) => ({
        refId: member._id })) :

      [];
      await db.
      collection('usergroups').
      updateOne({ _id: group._id }, { $set: { members: updatedMembers } });
    }
    process.stdout.write(`${this.name}...\r\n`);
  } };exports.default = _default;